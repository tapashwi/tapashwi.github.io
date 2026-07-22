import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '@/styles/Blog.module.css'

export default function BlogIndex() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data.posts || []))
      .catch(err => console.error('Error fetching posts:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Head>
        <title>Blog - Trending Video Creator</title>
        <meta name="description" content="Latest insights on trending topics and video content" />
      </Head>

      <div className={styles.container}>
        <h1>📖 Blog</h1>
        <p className={styles.subtitle}>Deep dives into trending topics, video analysis, and creator insights</p>

        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No blog posts yet. Check back soon!</p>
        ) : (
          <div className={styles.postsList}>
            {posts.map(post => (
              <article key={post.slug} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <Link href={`/blog/${post.slug}`}>
                    <a className={styles.postTitle}>{post.title}</a>
                  </Link>
                  <span className={styles.postDate}>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <p className={styles.postDescription}>{post.description}</p>
                <div className={styles.postTags}>
                  {post.tags && post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <a className={styles.readMore}>Continue Reading →</a>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
