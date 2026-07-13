import PageHero from '../components/PageHero'
import './PageContent.css'

const videos = [
  { title: 'A Day in the Life: Spring on the Homestead', date: 'March 2025', views: '14.2K views', thumb: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80' },
  { title: 'Our Complete Chicken Coop Tour (16 Birds!)', date: 'February 2025', views: '28.7K views', thumb: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80' },
  { title: 'How We Homeschool 3 Kids on a Working Farm', date: 'February 2025', views: '9.4K views', thumb: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80' },
  { title: 'Garden Planning for the Whole Year in One Afternoon', date: 'January 2025', views: '11.8K views', thumb: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80' },
  { title: 'Winter Pantry Tour — What We\'ve Put Up This Year', date: 'December 2024', views: '17.3K views', thumb: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=600&q=80' },
  { title: 'Raising Heritage Breed Chickens: Everything We Wish We\'d Known', date: 'December 2024', views: '32.1K views', thumb: 'https://images.unsplash.com/photo-1569197645040-f5d8eea706e6?w=600&q=80' },
]

const socials = [
  { name: 'YouTube', handle: '@TheJacobsHomestead', followers: '48K subscribers', icon: '▶', color: '#FF0000', link: 'https://youtube.com' },
  { name: 'Instagram', handle: '@thejacobshomestead', followers: '22K followers', icon: '◼', color: '#E4405F', link: 'https://instagram.com' },
  { name: 'Facebook', handle: 'The Jacobs Homestead', followers: '8.6K followers', icon: '◼', color: '#1877F2', link: 'https://facebook.com' },
]

export default function YouTubeMedia() {
  return (
    <div>
      <PageHero
        kicker="Watch & follow along"
        title="YouTube & Media"
        subtitle="Real, unfiltered homestead life — subscribe for weekly videos"
        image="media.jpg"
      />

      <section className="page-content">
        <div className="page-content__inner page-content__inner--narrow">
          <div className="content-block fade-up">
            <span className="content-kicker">Find us online</span>
            <h2 className="section-title">Follow the Journey</h2>
            <div className="divider"><span>✦</span></div>
            <p>
              We started filming because we wished someone had filmed their homestead journey before us. We
              wanted to see the real thing — the muddy boots, the learning curve, the small victories and the
              honest failures. That's what we put on camera.
            </p>
          </div>
        </div>

        {/* Social links */}
        <div className="page-content__inner" style={{ marginTop: '3rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '5rem' }}>
            {socials.map(s => (
              <a
                key={s.name}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  background: 'var(--parchment)',
                  padding: '1.5rem 2rem',
                  flex: '1',
                  minWidth: '220px',
                  maxWidth: '300px',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  borderBottom: `3px solid ${s.color}`,
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--brown-dark)', marginBottom: '0.2rem' }}>{s.name}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.75rem', color: 'var(--rust)', letterSpacing: '0.05em' }}>{s.handle}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.72rem', color: 'var(--brown-light)', marginTop: '0.3rem' }}>{s.followers}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Video grid */}
        <div className="page-content__inner">
          <div className="content-block fade-up">
            <span className="content-kicker" style={{ textAlign: 'center', display: 'block' }}>Recent uploads</span>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Latest Videos</h2>
            <div className="video-grid">
              {videos.map((video) => (
                <div key={video.title} className="video-card">
                  <div className="video-card__thumb">
                    <img src={video.thumb} alt={video.title} />
                    <div className="video-card__play">
                      <div className="video-card__play-icon">▶</div>
                    </div>
                  </div>
                  <div className="video-card__body">
                    <h3 className="video-card__title">{video.title}</h3>
                    <p className="video-card__meta">{video.date} · {video.views}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                View All Videos on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
