import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const [latestPost, setLatestPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try to fetch latest blog post metadata
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (data.posts && data.posts.length > 0) {
          setLatestPost(data.posts[0])
        }
      })
      .catch(err => console.error('Error fetching posts:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Head>
        <title>Trending Video Creator</title>
        <meta name="description" content="Daily trending video content on YouTube, TikTok, Instagram, and more" />
        <meta property="og:title" content="Trending Video Creator" />
        <meta property="og:description" content="Your daily dose of trending, viral content" />
        <meta property="og:type" content="website" />
      </Head>

      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>📺 Trending Videos Daily</h1>
            <p>Fresh, viral content delivered across YouTube, TikTok, Instagram, Facebook, and LinkedIn</p>
            <div className={styles.ctaButtons}>
              <Link href="/blog">
                <button>📖 Read Latest Blog</button>
              </Link>
              <a href="https://youtube.com/@yourhandle" target="_blank" rel="noopener noreferrer">
                <button style={{ marginLeft: '10px' }}>▶️ Watch on YouTube</button>
              </a>
            </div>
          </div>
        </section>

        {/* Latest Post Section */}
        {!loading && latestPost && (
          <section className={styles.latestSection}>
            <h2>📰 Latest Insight</h2>
            <div className={styles.latestCard}>
              <h3>{latestPost.title}</h3>
              <p className={styles.date}>{new Date(latestPost.date).toLocaleDateString()}</p>
              <p>{latestPost.description}</p>
              <Link href={`/blog/${latestPost.slug}`}>
                <a className={styles.readMore}>Read Full Post →</a>
              </Link>
            </div>
          </section>
        )}

        {/* Platforms Section */}
        <section className={styles.platforms}>
          <h2>📱 Follow Everywhere</h2>
          <div className={styles.platformGrid}>
            <div className={styles.platformCard}>
              <h4>▶️ YouTube</h4>
              <p>Long-form trending content</p>
              <a href="https://youtube.com/@yourhandle" target="_blank" rel="noopener noreferrer">Subscribe</a>
            </div>
            <div className={styles.platformCard}>
              <h4>📱 TikTok</h4>
              <p>Short, snappy viral videos</p>
              <a href="https://tiktok.com/@yourhandle" target="_blank" rel="noopener noreferrer">Follow</a>
            </div>
            <div className={styles.platformCard}>
              <h4>📸 Instagram</h4>
              <p>Reels and behind-the-scenes</p>
              <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer">Follow</a>
            </div>
            <div className={styles.platformCard}>
              <h4>f Facebook</h4>
              <p>Community and discussions</p>
              <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">Like</a>
            </div>
            <div className={styles.platformCard}>
              <h4>💼 LinkedIn</h4>
              <p>Professional insights</p>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">Follow</a>
            </div>
            <div className={styles.platformCard}>
              <h4>✉️ Newsletter</h4>
              <p>Weekly digest in your inbox</p>
              <a href="#subscribe">Subscribe</a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <h2>📊 By The Numbers</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>6</div>
              <div className={styles.statLabel}>Platforms</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>1</div>
              <div className={styles.statLabel}>New Video Daily</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Automated</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>🔥</div>
              <div className={styles.statLabel}>Trending Content</div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className={styles.about}>
          <h2>About This Platform</h2>
          <p>
            This is an automated video content platform that researches trending topics daily,
            generates video ideas using AI, creates high-quality videos, and automatically publishes
            them to 6 major social media platforms. Every video is optimized for its platform and
            includes detailed blog analysis.
          </p>
          <p>
            New video every day at 12:00 PM ACST. No human intervention. Just pure, trending content
            delivered daily to your feed.
          </p>
        </section>
      </div>
    </>
  )
}
