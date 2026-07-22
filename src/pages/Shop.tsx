import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useCart } from '../context/CartContext'
import { supabase, type Product } from '../lib/supabase'
import './PageContent.css'
import './Shop.css'

export default function Shop() {
  const { addItem, items } = useCart()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState<Product | null>(null)

  const cartCount = items.reduce((s, i) => s + i.qty, 0)

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('available', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setProducts(data ?? [])
        setLoading(false)
      })
  }, [])

  const allCategories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category).filter(Boolean)))
    return ['All', ...cats]
  }, [products])

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesCat = activeCategory === 'All' || p.category === activeCategory
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchesCat && matchesSearch
    })
  }, [products, search, activeCategory])

  const handleAdd = (p: Product) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.image_url })
    setAdded(p.id)
    setTimeout(() => setAdded(null), 1500)
  }

  const closeModal = () => setSelected(null)

  return (
    <div>
      <PageHero
        kicker="The Homestead Shop"
        title="Shop"
        subtitle="Resources, guides, and printables to help you on your homesteading journey"
        image="/shop2.png"
      />

      <section className="page-content">
        <div className="page-content__inner">
          <div className="content-block fade-up" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 2.5rem' }}>
            <span className="content-kicker">Handcrafted resources</span>
            <h2 className="section-title">Tools for your homestead journey</h2>
            <div className="divider"><span>✦</span></div>
            <p>Every resource we offer is born from real experience on our homestead. No fluff — just practical, honest guidance you can put to work right away.</p>

            {cartCount > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/cart" className="btn btn--outline">
                  View Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </Link>
              </div>
            )}
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--brown-mid)' }}>Loading...</p>
          ) : products.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--brown-mid)' }}>
              No products yet — check back soon!
            </p>
          ) : (
            <>
              <div className="shop-controls">
                <div className="shop-search">
                  <svg className="shop-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="shop-search__input"
                  />
                  {search && (
                    <button className="shop-search__clear" onClick={() => setSearch('')} aria-label="Clear search">✕</button>
                  )}
                </div>

                <div className="shop-filters">
                  {allCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`shop-filter-btn ${activeCategory === cat ? 'shop-filter-btn--active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="shop-empty">
                  <p>No products match your search.</p>
                  <button className="btn btn--outline" onClick={() => { setSearch(''); setActiveCategory('All') }}>
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="shop-grid">
                  {filtered.map((p, i) => (
                    <div key={p.id} className="shop-card fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="shop-card__img-wrap" onClick={() => setSelected(p)} style={{ cursor: 'pointer' }}>
                        <img className="shop-card__img" src={p.image_url} alt={p.name} />
                      </div>
                      <div className="shop-card__body">
                        <span className="shop-card__category">{p.category}</span>
                        <h3 className="shop-card__name">{p.name}</h3>
                        {p.description && <p className="shop-card__desc">{p.description}</p>}
                        <p className="shop-card__price">R{p.price.toFixed(2)}</p>
                        <div className="shop-card__actions">
                          <button className="shop-card__btn shop-card__btn--outline" onClick={() => setSelected(p)}>
                            View Details
                          </button>
                          <button className="shop-card__btn" onClick={() => handleAdd(p)}>
                            {added === p.id ? '✓ Added!' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Product detail modal */}
      {selected && (
        <div className="product-modal-overlay" onClick={closeModal}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <button className="product-modal__close" onClick={closeModal} aria-label="Close">✕</button>

            <div className="product-modal__inner">
              {selected.image_url && (
                <div className="product-modal__image">
                  <img src={selected.image_url} alt={selected.name} />
                </div>
              )}

              <div className="product-modal__info">
                {selected.category && (
                  <span className="product-modal__category">{selected.category}</span>
                )}
                <h2 className="product-modal__name">{selected.name}</h2>
                <p className="product-modal__price">R{selected.price.toFixed(2)}</p>

                {selected.full_description && (
                  <div className="product-modal__description">
                    <p>{selected.full_description}</p>
                  </div>
                )}

                {(selected.weight || selected.dimensions) && (
                  <div className="product-modal__specs">
                    <h4 className="product-modal__specs-title">Product Details</h4>
                    <ul className="product-modal__specs-list">
                      {selected.weight && (
                        <li>
                          <span className="product-modal__spec-label">Weight</span>
                          <span className="product-modal__spec-value">{selected.weight}</span>
                        </li>
                      )}
                      {selected.dimensions && (
                        <li>
                          <span className="product-modal__spec-label">Dimensions</span>
                          <span className="product-modal__spec-value">{selected.dimensions}</span>
                        </li>
                      )}
                      <li>
                        <span className="product-modal__spec-label">Availability</span>
                        <span className="product-modal__spec-value">
                          {selected.stock > 0 ? `In stock (${selected.stock} available)` : 'Out of stock'}
                        </span>
                      </li>
                    </ul>
                  </div>
                )}

                <div className="product-modal__footer">
                  <button
                    className="product-modal__add-btn"
                    onClick={() => handleAdd(selected)}
                    disabled={selected.stock === 0}
                  >
                    {added === selected.id ? '✓ Added to Cart!' : selected.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
