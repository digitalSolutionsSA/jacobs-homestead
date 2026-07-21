import { useEffect, useState, FormEvent } from 'react'
import { supabase, type Product } from '../../lib/supabase'
import './AdminBlogs.css'
import './AdminProducts.css'

const emptyProduct = { name: '', description: '', price: '', image_url: '', category: '', stock: '0', available: true }

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyProduct)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  const openNew = () => {
    setEditing(null)
    setForm(emptyProduct)
    setError('')
    setShowForm(true)
  }

  const openEdit = (product: Product) => {
    setEditing(product)
    setForm({
      name: product.name,
      description: product.description ?? '',
      price: String(product.price),
      image_url: product.image_url ?? '',
      category: product.category ?? '',
      stock: String(product.stock ?? 0),
      available: product.available,
    })
    setError('')
    setShowForm(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price) || 0,
      image_url: form.image_url,
      category: form.category,
      stock: parseInt(form.stock) || 0,
      available: form.available,
      updated_at: new Date().toISOString(),
    }
    const { error: err } = editing
      ? await supabase.from('products').update(payload).eq('id', editing.id)
      : await supabase.from('products').insert(payload)
    setSaving(false)
    if (err) { setError(err.message); return }
    setShowForm(false)
    fetchProducts()
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  const toggleAvailable = async (product: Product) => {
    await supabase.from('products').update({ available: !product.available }).eq('id', product.id)
    fetchProducts()
  }

  return (
    <div className="admin-products">
      <div className="admin-blogs__header">
        <h1>Products</h1>
        <button className="btn-primary" onClick={openNew}>+ New Product</button>
      </div>

      {loading ? (
        <p className="admin-loading-text">Loading...</p>
      ) : products.length === 0 ? (
        <div className="admin-empty">
          <p>No products yet. Add your first one!</p>
        </div>
      ) : (
        <div className="admin-products__grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              {product.image_url && (
                <img src={product.image_url} alt={product.name} className="product-card__img" />
              )}
              <div className="product-card__body">
                <span className="product-card__name">{product.name}</span>
                {product.category && <span className="product-card__cat">{product.category}</span>}
                <span className="product-card__price">R {Number(product.price).toFixed(2)}</span>
                <span className="product-card__stock">Stock: {product.stock}</span>
              </div>
              <div className="product-card__footer">
                <span className={`badge ${product.available ? 'badge--green' : 'badge--grey'}`}>
                  {product.available ? 'Available' : 'Hidden'}
                </span>
                <div className="product-card__actions">
                  <button className="btn-sm" onClick={() => toggleAvailable(product)}>
                    {product.available ? 'Hide' : 'Show'}
                  </button>
                  <button className="btn-sm" onClick={() => openEdit(product)}>Edit</button>
                  <button className="btn-sm btn-sm--danger" onClick={() => deleteProduct(product.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2>{editing ? 'Edit Product' : 'New Product'}</h2>
              <button className="admin-modal__close" onClick={() => setShowForm(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form__field">
                <label>Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div className="admin-form__row">
                <div className="admin-form__field">
                  <label>Price (R) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    required
                  />
                </div>
                <div className="admin-form__field">
                  <label>Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                  />
                </div>
              </div>
              <div className="admin-form__field">
                <label>Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  placeholder="e.g. Eggs, Chickens, Honey"
                />
              </div>
              <div className="admin-form__field">
                <label>Image URL</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>
              <div className="admin-form__field">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={4}
                  placeholder="Describe the product..."
                />
              </div>
              <div className="admin-form__field admin-form__field--row">
                <label>
                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={e => setForm(f => ({ ...f, available: e.target.checked }))}
                  />
                  Available in shop
                </label>
              </div>
              {error && <p className="admin-form__error">{error}</p>}
              <div className="admin-form__footer">
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
