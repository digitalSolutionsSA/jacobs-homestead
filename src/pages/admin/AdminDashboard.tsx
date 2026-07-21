import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ blogs: 0, publishedBlogs: 0, products: 0, availableProducts: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: blogs }, { count: publishedBlogs }, { count: products }, { count: availableProducts }] = await Promise.all([
        supabase.from('blogs').select('*', { count: 'exact', head: true }),
        supabase.from('blogs').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('available', true),
      ])
      setStats({
        blogs: blogs ?? 0,
        publishedBlogs: publishedBlogs ?? 0,
        products: products ?? 0,
        availableProducts: availableProducts ?? 0,
      })
    }
    fetchStats()
  }, [])

  return (
    <div className="admin-dashboard">
      <h1>Welcome back</h1>
      <p className="admin-dashboard__email">{user?.email}</p>

      <div className="admin-dashboard__stats">
        <div className="stat-card">
          <span className="stat-card__number">{stats.blogs}</span>
          <span className="stat-card__label">Total Blog Posts</span>
          <span className="stat-card__sub">{stats.publishedBlogs} published</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__number">{stats.products}</span>
          <span className="stat-card__label">Total Products</span>
          <span className="stat-card__sub">{stats.availableProducts} available</span>
        </div>
      </div>

      <div className="admin-dashboard__actions">
        <Link to="/admin/blogs" className="action-card">
          <span className="action-card__icon">📝</span>
          <span className="action-card__title">Manage Blogs</span>
          <span className="action-card__desc">Create, edit and publish blog posts</span>
        </Link>
        <Link to="/admin/products" className="action-card">
          <span className="action-card__icon">🛒</span>
          <span className="action-card__title">Manage Products</span>
          <span className="action-card__desc">Add and update shop products</span>
        </Link>
      </div>
    </div>
  )
}
