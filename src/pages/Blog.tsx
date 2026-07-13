import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './PageContent.css'

const allPosts = [
  { id: 1, category: 'Chickens', title: 'Getting Started with Backyard Chickens', excerpt: 'Everything you need to know before bringing your first flock home — from coop setup to daily care routines that work for busy families.', date: 'March 15, 2025', image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80' },
  { id: 2, category: 'Homeschooling', title: 'Using the Garden as Your Classroom', excerpt: 'How we incorporate nature, seasons, and real-world skills into our homeschool curriculum — no textbooks required.', date: 'February 28, 2025', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80' },
  { id: 3, category: 'Homesteading', title: 'Preserving the Harvest: A Beginner\'s Canning Guide', excerpt: 'Step-by-step guidance on water bath canning so you can stock your pantry with summer\'s bounty all winter long.', date: 'February 10, 2025', image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=600&q=80' },
  { id: 4, category: 'Simple Living', title: 'How We Simplified Our Mornings on the Homestead', excerpt: 'Morning routines can make or break your day. Here\'s how we structured ours to feel grounded even during busy seasons.', date: 'January 20, 2025', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80' },
  { id: 5, category: 'Chickens', title: 'Winter Chicken Keeping: Keeping Your Flock Healthy in the Cold', excerpt: 'Chickens are hardier than most people think. Learn what they actually need — and what they don\'t — to thrive through winter.', date: 'January 5, 2025', image: 'https://images.unsplash.com/photo-1569197645040-f5d8eea706e6?w=600&q=80' },
  { id: 6, category: 'Homesteading', title: 'Starting a Kitchen Garden From Scratch', excerpt: 'Our step-by-step approach to building a productive kitchen garden, even if you\'ve never grown a single thing before.', date: 'December 18, 2024', image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=600&q=80' },
  { id: 7, category: 'Faith & Family', title: 'Finding Sabbath Rest on a Working Homestead', excerpt: 'One of the hardest lessons we\'ve learned: the homestead does not demand our constant labor. Neither does God.', date: 'December 5, 2024', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { id: 8, category: 'Homeschooling', title: 'Our Favorite Living Books for Nature Study', excerpt: 'A curated list of the books that have shaped our children\'s love of the natural world and sparked the best conversations.', date: 'November 22, 2024', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80' },
  { id: 9, category: 'Simple Living', title: 'Making Your Own Beeswax Wraps', excerpt: 'A simple afternoon project that replaces plastic wrap in your kitchen — better for the environment and genuinely pretty.', date: 'November 10, 2024', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
]

const categories = ['All', 'Chickens', 'Homeschooling', 'Homesteading', 'Simple Living', 'Faith & Family']

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const filtered = activeCategory === 'All' ? allPosts : allPosts.filter(p => p.category === activeCategory)

  return (
    <div>
      <PageHero
        kicker="Stories from the homestead"
        title="The Blog"
        subtitle="Real life, honest reflections, and practical guides from our family farm"
        image="public/blog.jpg"
      />

      <section className="page-content">
        <div className="page-content__inner">
          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.55rem 1.4rem',
                  border: `1px solid ${activeCategory === cat ? 'var(--rust)' : 'var(--tan)'}`,
                  background: activeCategory === cat ? 'var(--rust)' : 'transparent',
                  color: activeCategory === cat ? 'var(--warm-white)' : 'var(--brown-mid)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blog-grid-full">
            {filtered.map((post) => (
              <article key={post.id} className="blog-card fade-up">
                <div className="blog-card__image">
                  <img src={post.image} alt={post.title} />
                  <span className="blog-card__category">{post.category}</span>
                </div>
                <div className="blog-card__body">
                  <time className="blog-card__date">{post.date}</time>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <Link to="#" className="blog-card__read">Read More →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
