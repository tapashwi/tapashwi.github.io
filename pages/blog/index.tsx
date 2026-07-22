import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  
  const posts: BlogPost[] = files.map(file => {
    const slug = file.replace('.md', '');
    const [date, ...titleParts] = slug.split('-');
    return {
      slug,
      title: titleParts.join(' ').replace(/[-_]/g, ' '),
      date,
      excerpt: 'Click to read full post...',
    };
  }).reverse().slice(0, 10);

  return { props: { posts }, revalidate: 3600 };
}

export default function Blog({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <Head>
        <title>Blog | VideoForge</title>
        <meta name="description" content="Latest insights on AI video generation and content strategy" />
      </Head>

      <header>
        <nav className="container">
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            <span className="accent">▶</span> VideoForge
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </nav>
      </header>

      <main className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <h1>Blog</h1>
        <p>Latest insights on trending topics, video strategy, and AI content generation.</p>

        <div className="blog-grid">
          {posts.map(post => (
            <div key={post.slug} className="blog-card">
              <div className="blog-card-date">{post.date}</div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`}>Read More →</Link>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>
            No blog posts yet. Check back soon!
          </p>
        )}
      </main>

      <footer className="container">
        <p>&copy; 2026 VideoForge. All rights reserved.</p>
      </footer>
    </>
  );
}
