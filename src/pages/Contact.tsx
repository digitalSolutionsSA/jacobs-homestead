import { useState } from 'react'
import PageHero from '../components/PageHero'
import './PageContent.css'

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div>
      <PageHero
        kicker="We'd love to hear from you"
        title="Contact"
        subtitle="Questions, collaborations, or just a kind hello — our inbox is open"
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80"
      />

      <section className="page-content">
        <div className="page-content__inner">
          <div className="contact-grid">
            <div className="contact-info fade-up">
              <span className="content-kicker">Reach out</span>
              <h2 className="section-title">Say Hello</h2>
              <div className="divider" style={{ justifyContent: 'flex-start' }}><span>✦</span></div>
              <p>
                We read every message personally and do our best to respond within a few days. Please be patient
                with us — homestead life keeps us beautifully busy, especially during planting and harvest seasons.
              </p>
              <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="contact-detail">
                  <span>📧</span>
                  <span>hello@thejacobshomestead.com</span>
                </div>
                <div className="contact-detail">
                  <span>📍</span>
                  <span>Somewhere in rural America</span>
                </div>
                <div className="contact-detail">
                  <span>📸</span>
                  <span>@thejacobshomestead</span>
                </div>
              </div>

              <div style={{ marginTop: '3rem', background: 'var(--parchment)', padding: '2rem', borderLeft: '3px solid var(--rust)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '0.75rem', color: 'var(--brown-dark)' }}>
                  For collaborations & partnerships
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--brown-mid)', lineHeight: '1.7', margin: 0 }}>
                  We partner with brands that genuinely align with our homestead values — no greenwashing,
                  no products we wouldn't use ourselves. Please include details about your brand and vision.
                </p>
              </div>
            </div>

            <div className="fade-up" style={{ animationDelay: '0.15s' }}>
              {sent ? (
                <div style={{ background: 'var(--parchment)', padding: '4rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🌿</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontStyle: 'italic', color: 'var(--brown-dark)', marginBottom: '1rem' }}>
                    Message Received!
                  </h3>
                  <p style={{ color: 'var(--brown-mid)', fontSize: '1rem', lineHeight: '1.8' }}>
                    Thank you for reaching out. We'll get back to you within a few days.
                    In the meantime, come find us on Instagram or YouTube!
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} required placeholder="Jane" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} required placeholder="Smith" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required placeholder="jane@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required>
                      <option value="">Select a topic…</option>
                      <option>General Question</option>
                      <option>Chickens & Flock Advice</option>
                      <option>Homeschooling</option>
                      <option>Collaboration / Partnership</option>
                      <option>Blog / Content</option>
                      <option>Shop / Products</option>
                      <option>Just saying hi!</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={6} placeholder="What's on your heart?" />
                  </div>
                  <button type="submit" className="btn btn--primary">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
