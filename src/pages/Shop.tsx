import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useCart } from '../context/CartContext'
import './PageContent.css'

const products = [
  { id: 1, name: 'Homestead Starter Guide',     category: 'Digital Downloads', price: 12, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80' },
  { id: 2, name: 'Chicken Keeping Handbook',     category: 'Digital Downloads', price: 9,  image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&q=80' },
  { id: 3, name: 'Canning & Preserving Workbook',category: 'Digital Downloads', price: 14, image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=500&q=80' },
  { id: 4, name: 'Homeschool Planning Bundle',   category: 'Printables',        price: 18, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80' },
  { id: 5, name: 'Garden Journal Printable',     category: 'Printables',        price: 7,  image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80' },
  { id: 6, name: 'Seasonal Meal Planner',        category: 'Printables',        price: 8,  image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80' },
]

export default function Shop() {
  const { addItem, items } = useCart()
  const [added, setAdded] = useState<number | null>(null)

  const handleAdd = (p: typeof products[number]) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.image })
    setAdded(p.id)
    setTimeout(() => setAdded(null), 1500)
  }

  const cartCount = items.reduce((s, i) => s + i.qty, 0)

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
          <div className="content-block fade-up" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 3rem' }}>
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

          <div className="shop-grid">
            {products.map((p, i) => (
              <div key={p.id} className="shop-card fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="shop-card__img-wrap">
                  <img className="shop-card__img" src={p.image} alt={p.name} />
                </div>
                <div className="shop-card__body">
                  <span className="shop-card__category">{p.category}</span>
                  <h3 className="shop-card__name">{p.name}</h3>
                  <p className="shop-card__price">${p.price.toFixed(2)}</p>
                  <button
                    className="shop-card__btn"
                    onClick={() => handleAdd(p)}
                  >
                    {added === p.id ? '✓ Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
