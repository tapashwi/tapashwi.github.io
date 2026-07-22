import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>AI-Powered Video Creator | Auto-Generated Trending Content</title>
        <meta name="description" content="Automatically generate and publish trending videos to 6+ platforms daily with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AI-Powered Video Creator" />
        <meta property="og:description" content="Automatically generate and publish trending videos to 6+ platforms daily" />
        <meta property="og:type" content="website" />
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

      <main>
        <section className="hero">
          <h1>Trending Videos Created Daily</h1>
          <p>AI-powered video generation and multi-platform publishing. From trends to monetization in 24 hours.</p>
          <a href="/about" className="cta-button">Learn More →</a>
        </section>

        <section className="container" style={{ paddingTop: '3rem' }}>
          <h2>How It Works</h2>
          <div className="stats">
            <div className="stat-box">
              <div className="stat-number">1</div>
              <h3>Research Trends</h3>
              <p>Daily trending topic research across Reddit, News APIs, and Google Trends</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">2</div>
              <h3>Generate Ideas</h3>
              <p>AI creates 10 unique video ideas with scripts and hooks optimized per platform</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">3</div>
              <h3>Create Videos</h3>
              <p>Automated video generation using Google Veo 3 and ElevenLabs TTS</p>
            </div>
            <div className="stat-box">
              <div className="stat-number">4</div>
              <h3>Multi-Platform</h3>
              <p>Auto-publish to YouTube, TikTok, Instagram, Facebook, LinkedIn + blog</p>
            </div>
          </div>
        </section>

        <section className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <h2>Latest Blog Posts</h2>
          <p>Check out our latest insights on trending topics and content strategy.</p>
          <Link href="/blog" className="cta-button">View All Posts →</Link>
        </section>
      </main>

      <footer className="container">
        <p>&copy; 2026 VideoForge. All rights reserved.</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          <Link href="/about">About</Link> | 
          <Link href="/blog" style={{ margin: '0 0.5rem' }}>Blog</Link> | 
          <Link href="/contact">Contact</Link>
        </p>
      </footer>
    </>
  );
}
