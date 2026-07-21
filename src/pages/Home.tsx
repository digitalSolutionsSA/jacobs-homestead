import './Home.css'
import { Link } from 'react-router-dom'

const featuredPosts = [
  {
    id: 1,
    category: 'Homesteading',
    title: 'Getting Started with Backyard Chickens',
    excerpt: 'Everything you need to know before bringing your first flock home — from coop setup to daily care routines that work for busy families.',
    date: 'March 15, 2025',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
  },
  {
    id: 2,
    category: 'Homeschooling',
    title: 'Using the Garden as Your Classroom',
    excerpt: 'How we incorporate nature, seasons, and real-world skills into our homeschool curriculum — no textbooks required.',
    date: 'February 28, 2025',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
  },
  {
    id: 3,
    category: 'Simple Living',
    title: 'Preserving the Harvest: A Beginner\'s Canning Guide',
    excerpt: 'Step-by-step guidance on water bath canning so you can stock your pantry with summer\'s bounty all winter long.',
    date: 'February 10, 2025',
    image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=600&q=80',
  },
]

const pillars = [
  {
    icon: '🐓',
    title: 'Our Chickens',
    desc: 'We raise heritage breed chickens for eggs and the pure joy of it. Learn about our flock, our coop setup, and how to get started.',
    link: '/our-chickens',
  },
  {
    icon: '📚',
    title: 'Homeschooling',
    desc: 'Faith-centered, nature-rich education at home. We share our curriculum, our rhythms, and the lessons only the homestead can teach.',
    link: '/homeschooling',
  },
  {
    icon: '🌿',
    title: 'Simple Living',
    desc: 'From scratch cooking to preserving the harvest — we\'re learning alongside you what it means to slow down and live with intention.',
    link: '/blog',
  },
  {
    icon: '🎥',
    title: 'YouTube & Media',
    desc: 'Join us on YouTube for real, unfiltered glimpses into homestead life — the beautiful moments and the muddy ones too.',
    link: '/youtube-media',
  },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-bg" />
        <div className="home__hero-content fade-up">
          <p className="home__hero-eyebrow">Welcome to</p>
          <h1 className="home__hero-title">The Jacobs<br />Homestead</h1>
          <p className="home__hero-sub">
            Rooted in Christ • Growing in Grace
          </p>
          <div className="home__hero-divider">
            <span>✦</span>
          </div>
          <p className="home__hero-desc fade-up fade-up-delay-2">
            A family homestead rooted in Christ, we share our journey of homesteading, homeschooling,<br />
            raising farm animals, growing food, creating a life centred on faith, family and purpose.
          </p>
          <div className="home__hero-actions fade-up fade-up-delay-3">
            <Link to="/about" className="btn btn--primary">Our Story</Link>
            <Link to="/blog" className="btn btn--ghost">Read the Blog</Link>
          </div>
        </div>
        <div className="home__hero-scroll">
          <span>Scroll</span>
          <div className="home__hero-scroll-line" />
        </div>
      </section>

      {/* Intro banner */}
      <section className="home__intro">
        <div className="home__intro-inner">
          <div className="home__intro-text">
            <span className="home__intro-kicker">This is Us</span>
            <h2 className="section-title">Meet the Family</h2>
            <div className="divider"><span>✦</span></div>
            <p>
              We're the Jacobs family — learning, growing, and sharing our homesteading life with anyone who
              dreams of a simpler way. Whether you're raising chickens in your backyard or building a homestead
              from scratch, you'll find honest, real-life guidance here.
            </p>
          </div>
          <div className="home__intro-image-grid">
            <div className="home__intro-img home__intro-img--tall">
              <img src="/family.jpeg" alt="Farm landscape" />
            </div>
            <div className="home__intro-img">
              <img src="/jwork.jpeg" alt="Homestead life" />
            </div>
            <div className="home__intro-img">
              <img src="/joshcow.jpeg" alt="Chickens" />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="home__pillars">
        <div className="home__pillars-inner">
          <div className="home__pillars-header">
            <p className="home__pillars-kicker">A look into our days</p>
            <h2 className="section-title">Homestead Life & Learning</h2>
          </div>
          <div className="home__pillars-grid">
            {pillars.map((p, i) => (
              <Link to={p.link} key={i} className="pillar-card fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="pillar-card__icon">{p.icon}</div>
                <h3 className="pillar-card__title">{p.title}</h3>
                <p className="pillar-card__desc">{p.desc}</p>
                <span className="pillar-card__link">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote banner */}
      <section className="home__quote">
        <div className="home__quote-inner">
          <span className="home__quote-ornament">"</span>
          <blockquote className="home__quote-text">
            She looks well to the ways of her household,<br />
            and does not eat the bread of idleness.
          </blockquote>
          <cite className="home__quote-cite">— Proverbs 31:27</cite>
        </div>
      </section>

      {/* Blog preview */}
      <section className="home__blog">
        <div className="home__blog-inner">
          <div className="home__blog-header">
            <p className="home__blog-kicker">From the blog</p>
            <h2 className="section-title">Latest from the Homestead</h2>
          </div>
          <div className="home__blog-grid">
            {featuredPosts.map((post) => (
              <article key={post.id} className="blog-card fade-up">
                <div className="blog-card__image">
                  <img src={post.image} alt={post.title} />
                  <span className="blog-card__category">{post.category}</span>
                </div>
                <div className="blog-card__body">
                  <time className="blog-card__date">{post.date}</time>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <Link to="/blog" className="blog-card__read">Read More →</Link>
                </div>
              </article>
            ))}
          </div>
          <div className="home__blog-footer">
            <Link to="/blog" className="btn btn--outline">View All Posts</Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="home__newsletter">
        <div className="home__newsletter-inner">
          <div className="home__newsletter-leaf home__newsletter-leaf--left">🌿</div>
          <div className="home__newsletter-content">
            <p className="home__newsletter-kicker">Join the community</p>
            <h2 className="section-title">Stay connected<br />with the homestead</h2>
            <p>Get seasonal updates, recipes, chicken keeping tips, and behind-the-scenes homestead life delivered straight to your inbox.</p>
            <form className="home__newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Your first name" className="home__newsletter-input" />
              <input type="email" placeholder="Your email address" className="home__newsletter-input" />
              <button type="submit" className="btn btn--primary">Subscribe</button>
            </form>
          </div>
          <div className="home__newsletter-leaf home__newsletter-leaf--right">🌿</div>
        </div>
      </section>
    </div>
  )
}
