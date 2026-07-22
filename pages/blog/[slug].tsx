import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

interface BlogPostProps {
  title: string;
  date: string;
  content: string;
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const postsDir = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDir, `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const [date, ...titleParts] = params.slug.split('-');

  return {
    props: {
      title: titleParts.join(' ').replace(/[-_]/g, ' '),
      date,
      content,
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const postsDir = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  
  return {
    paths: files.map(f => ({ params: { slug: f.replace('.md', '') } })),
    fallback: 'blocking',
  };
}

export default function BlogPost({ title, date, content }: BlogPostProps) {
  return (
    <>
      <Head>
        <title>{title} | VideoForge Blog</title>
        <meta name="description" content={title} />
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

      <main className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '800px' }}>
        <article>
          <h1>{title}</h1>
          <p style={{ color: '#888', marginBottom: '2rem' }}>Published on {date}</p>
          <div style={{ lineHeight: '1.8', color: '#ddd' }}>
            {content.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </article>
        <Link href="/blog">← Back to Blog</Link>
      </main>

      <footer className="container">
        <p>&copy; 2026 VideoForge. All rights reserved.</p>
      </footer>
    </>
  );
}
