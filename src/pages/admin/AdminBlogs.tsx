import { useEffect, useState, FormEvent, useRef } from 'react'
import { supabase, type Blog } from '../../lib/supabase'
import './AdminBlogs.css'

const BLOG_CATEGORIES = ['Chickens', 'Homeschooling', 'Simple Living', 'Little Makers', 'Other']

const emptyBlog = { title: '', slug: '', excerpt: '', category: '', content: '', image_url: '', published: false }

async function uploadImage(file: File, folder: string): Promise<string> {
  const ext = file.name.split('.').pop()
  const path = `${folder}/${Date.now()}.${ext}`
  const { error } = await supabase.storage.from('images').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('images').getPublicUrl(path)
  return data.publicUrl
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Blog | null>(null)
  const [form, setForm] = useState(emptyBlog)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchBlogs = async () => {
    setLoading(true)
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
    setBlogs(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchBlogs() }, [])

  const openNew = () => {
    setEditing(null)
    setForm(emptyBlog)
    setError('')
    setShowForm(true)
  }

  const openEdit = (blog: Blog) => {
    setEditing(blog)
    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt ?? '',
      category: blog.category ?? '',
      content: blog.content ?? '',
      image_url: blog.image_url ?? '',
      published: blog.published,
    })
    setError('')
    setShowForm(true)
  }

  const handleSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleTitleChange = (v: string) => {
    setForm(f => ({ ...f, title: v, slug: editing ? f.slug : handleSlug(v) }))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadImage(file, 'blog')
      setForm(f => ({ ...f, image_url: url }))
    } catch (err: any) {
      setError('Image upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = { ...form, updated_at: new Date().toISOString() }
    const { error: err } = editing
      ? await supabase.from('blogs').update(payload).eq('id', editing.id)
      : await supabase.from('blogs').insert(payload)
    setSaving(false)
    if (err) { setError(err.message); return }
    setShowForm(false)
    fetchBlogs()
  }

  const deleteBlog = async (id: string) => {
    if (!confirm('Delete this blog post?')) return
    await supabase.from('blogs').delete().eq('id', id)
    fetchBlogs()
  }

  const togglePublish = async (blog: Blog) => {
    await supabase.from('blogs').update({ published: !blog.published }).eq('id', blog.id)
    fetchBlogs()
  }

  return (
    <div className="admin-blogs">
      <div className="admin-blogs__header">
        <h1>Blog Posts</h1>
        <button className="btn-primary" onClick={openNew}>+ New Post</button>
      </div>

      {loading ? (
        <p className="admin-loading-text">Loading...</p>
      ) : blogs.length === 0 ? (
        <div className="admin-empty">
          <p>No blog posts yet. Create your first one!</p>
        </div>
      ) : (
        <div className="admin-blogs__list">
          {blogs.map(blog => (
            <div key={blog.id} className="blog-row">
              <div className="blog-row__info">
                <span className="blog-row__title">{blog.title}</span>
                <span className="blog-row__slug">/{blog.slug}</span>
              </div>
              <div className="blog-row__actions">
                <span className={`badge ${blog.published ? 'badge--green' : 'badge--grey'}`}>
                  {blog.published ? 'Published' : 'Draft'}
                </span>
                <button className="btn-sm" onClick={() => togglePublish(blog)}>
                  {blog.published ? 'Unpublish' : 'Publish'}
                </button>
                <button className="btn-sm" onClick={() => openEdit(blog)}>Edit</button>
                <button className="btn-sm btn-sm--danger" onClick={() => deleteBlog(blog.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2>{editing ? 'Edit Post' : 'New Post'}</h2>
              <button className="admin-modal__close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form__field">
                <label>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  required
                />
              </div>
              <div className="admin-form__field">
                <label>Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                  required
                />
              </div>
              <div className="admin-form__field">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                >
                  <option value="">— Select a category —</option>
                  {BLOG_CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="admin-form__field">
                <label>Excerpt</label>
                <input
                  type="text"
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Short summary shown in blog list"
                />
              </div>
              <div className="admin-form__field">
                <label>Image</label>
                {form.image_url && (
                  <div className="admin-image-preview">
                    <img src={form.image_url} alt="Preview" />
                    <button
                      type="button"
                      className="admin-image-preview__remove"
                      onClick={() => { setForm(f => ({ ...f, image_url: '' })); if (fileInputRef.current) fileInputRef.current.value = '' }}
                    >
                      Remove
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="admin-file-input"
                  onChange={handleImageChange}
                  disabled={uploading}
                />
                {uploading && <p className="admin-upload-status">Uploading image...</p>}
              </div>
              <div className="admin-form__field">
                <label>Content *</label>
                <textarea
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  rows={12}
                  required
                  placeholder="Write your blog content here..."
                />
              </div>
              <div className="admin-form__field admin-form__field--row">
                <label>
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                  />
                  Publish immediately
                </label>
              </div>
              {error && <p className="admin-form__error">{error}</p>}
              <div className="admin-form__footer">
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving || uploading}>
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
