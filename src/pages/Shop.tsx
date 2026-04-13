import PageHero from '../components/PageHero'
import './PageContent.css'

const products = [
  { name: 'Homestead Starter Guide', category: 'Digital Downloads', price: '$12.00', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80' },
  { name: 'Chicken Keeping Handbook', category: 'Digital Downloads', price: '$9.00', image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&q=80' },
  { name: 'Canning & Preserving Workbook', category: 'Digital Downloads', price: '$14.00', image: 'https://images.unsplash.com/photo-1601598851547-4302969d0614?w=500&q=80' },
  { name: 'Homeschool Planning Bundle', category: 'Printables', price: '$18.00', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80' },
  { name: 'Garden Journal Printable', category: 'Printables', price: '$7.00', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80' },
  { name: 'Seasonal Meal Planner', category: 'Printables', price: '$8.00', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80' },
]

export default function Shop() {
  return (
    <div>
      <PageHero
        kicker="The Homestead Shop"
        title="Shop"
        subtitle="Resources, guides, and printables to help you on your homesteading journey"
        image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1800&q=80"
      />

      <section className="page-content">
        <div className="page-content__inner">
          <div className="content-block fade-up" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 3rem' }}>
            <span className="content-kicker">Handcrafted resources</span>
            <h2 className="section-title">Tools for your homestead journey</h2>
            <div className="divider"><span>✦</span></div>
            <p>Every resource we offer is born from real experience on our homestead. No fluff — just practical, honest guidance you can put to work right away.</p>
          </div>

          <div className="shop-grid">
            {products.map((p, i) => (
              <div key={i} className="shop-card fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="shop-card__img-wrap">
                  <img className="shop-card__img" src={p.image} alt={p.name} />
                </div>
                <div className="shop-card__body">
                  <span className="shop-card__category">{p.category}</span>
                  <h3 className="shop-card__name">{p.name}</h3>
                  <p className="shop-card__price">{p.price}</p>
                  <button className="shop-card__btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
