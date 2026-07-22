import Head from 'next/head';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <Head>
        <title>About | VideoForge</title>
        <meta name="description" content="Learn about VideoForge — AI-powered video automation platform" />
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
        <h1>About VideoForge</h1>
        
        <section style={{ marginTop: '2rem' }}>
          <h2>What is VideoForge?</h2>
          <p>
            VideoForge is an AI-powered platform that automates the entire video creation and publishing workflow. 
            From identifying trending topics to publishing optimized videos across 6+ platforms, we handle it all.
          </p>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Our Technology</h2>
          <p>
            We leverage state-of-the-art AI models for:
          </p>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li><strong>Trend Research:</strong> Real-time trending topics from Reddit, News APIs, Google Trends</li>
            <li><strong>Idea Generation:</strong> Claude AI for creative video concepts and scripts</li>
            <li><strong>Video Creation:</strong> Google Veo 3 for cinematic video generation</li>
            <li><strong>Voice Generation:</strong> ElevenLabs TTS for natural-sounding narration</li>
            <li><strong>Multi-Platform Publishing:</strong> Native APIs for YouTube, TikTok, Instagram, Facebook, LinkedIn</li>
          </ul>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Our Mission</h2>
          <p>
            To empower creators with AI-driven automation, eliminating the tedious tasks of content creation 
            and enabling focus on what matters: strategy, engagement, and growth.
          </p>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Contact & Support</h2>
          <p>
            Have questions? <Link href="/contact">Get in touch</Link>.
          </p>
        </section>

        <Link href="/" style={{ marginTop: '2rem', display: 'inline-block' }}>← Back to Home</Link>
      </main>

      <footer className="container">
        <p>&copy; 2026 VideoForge. All rights reserved.</p>
      </footer>
    </>
  );
}
