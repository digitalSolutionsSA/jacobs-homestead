import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { supabase, type Blog } from '../lib/supabase'
import './PageContent.css'
import './BlogPost.css'

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) {
          navigate('/blog', { replace: true })
        } else {
          setPost(data)
        }
        setLoading(false)
      })
  }, [slug, navigate])

  if (loading) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center', color: 'var(--brown-mid)' }}>
        Loading...
      </div>
    )
  }

  if (!post) return null

  return (
    <div>
      <PageHero
        kicker={post.category}
        title={post.title}
        subtitle={post.excerpt}
        image={post.image_url || '/blog.jpg'}
      />

      <section className="page-content">
        <div className="page-content__inner page-content__inner--narrow">
          <Link to="/blog" className="blog-post__back">← Back to Blog</Link>

          <div className="blog-post__meta">
            <time>{formatDate(post.created_at)}</time>
            <span className="blog-post__category">{post.category}</span>
          </div>

          <div
            className="blog-post__body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="blog-post__footer">
            <Link to="/blog" className="blog-card__read">← Back to all posts</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
