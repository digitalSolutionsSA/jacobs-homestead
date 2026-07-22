import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { supabase, type Blog } from '../lib/supabase'
import './PageContent.css'

const CATEGORIES = ['All', 'Chickens', 'Homeschooling', 'Simple Living', 'Little Makers', 'Other']

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Blog() {
  const [posts, setPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPosts(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <PageHero
        kicker="Stories from the homestead"
        title="The Blog"
        subtitle="Real life, honest reflections, and practical guides from our family farm"
        image="/blog.jpg"
      />

      <section className="page-content">
        <div className="page-content__inner">
          {!loading && posts.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3.5rem' }}>
              {CATEGORIES.map(cat => (
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
          )}

          {loading ? (
            <p style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--brown-mid)' }}>Loading...</p>
          ) : posts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--brown-mid)' }}>
              No blog posts yet — check back soon!
            </p>
          ) : (
            <div className="blog-grid-full">
              {(activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)).map((post) => (
                <article key={post.id} className="blog-card fade-up">
                  {post.image_url && (
                    <div className="blog-card__image">
                      <img src={post.image_url} alt={post.title} />
                    </div>
                  )}
                  <div className="blog-card__body">
                    <time className="blog-card__date">{formatDate(post.created_at)}</time>
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="blog-card__read">Read More →</Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
