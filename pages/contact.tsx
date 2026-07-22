import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Head>
        <title>Contact | VideoForge</title>
        <meta name="description" content="Get in touch with VideoForge" />
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

      <main className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem', maxWidth: '600px' }}>
        <h1>Contact Us</h1>
        <p>Have questions or collaboration opportunities? Reach out to us.</p>

        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1a1a2e',
                border: '1px solid #333',
                color: '#fff',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1a1a2e',
                border: '1px solid #333',
                color: '#fff',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1a1a2e',
                border: '1px solid #333',
                color: '#fff',
                borderRadius: '4px',
                fontFamily: 'inherit',
              }}
            />
          </div>

          <button
            type="submit"
            className="cta-button"
            style={{ cursor: 'pointer' }}
          >
            Send Message
          </button>

          {submitted && (
            <p style={{ marginTop: '1rem', color: '#00ff88' }}>
              ✓ Message sent! We'll get back to you soon.
            </p>
          )}
        </form>

        <Link href="/" style={{ marginTop: '2rem', display: 'inline-block' }}>← Back to Home</Link>
      </main>

      <footer className="container">
        <p>&copy; 2026 VideoForge. All rights reserved.</p>
      </footer>
    </>
  );
}
