import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from '@/styles/BlogPost.module.css'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    fetch(`/api/posts/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Post not found')
        return res.json()
      })
      .then(data => setPost(data.post))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className={styles.container}><p>Loading...</p></div>
  if (error) return <div className={styles.container}><p>Error: {error}</p></div>
  if (!post) return <div className={styles.container}><p>Post not found</p></div>

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
      </Head>

      <div className={styles.container}>
        <article className={styles.article}>
          <header className={styles.header}>
            <h1>{post.title}</h1>
            <div className={styles.meta}>
              <span className={styles.date}>{new Date(post.date).toLocaleDateString()}</span>
              <span className={styles.author}>by {post.author}</span>
            </div>
            {post.tags && (
              <div className={styles.tags}>
                {post.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}
          </header>

          <div className={`${styles.content} markdown-content`}>
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h2 {...props} />,
                h2: ({ node, ...props }) => <h3 {...props} />,
                h3: ({ node, ...props }) => <h4 {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <footer className={styles.footer}>
            <p>Published on {new Date(post.date).toLocaleDateString()} by {post.author}</p>
          </footer>
        </article>

        {/* Related Posts Section */}
        <aside className={styles.sidebar}>
          <h3>📚 More to Explore</h3>
          <p>Check out more content on our <a href="/blog">blog index</a>.</p>
        </aside>
      </div>
    </>
  )
}
