import PageHero from '../components/PageHero'
import './PageContent.css'

const resourceGroups = [
  {
    group: 'Getting Started',
    items: [
      { icon: '🐣', title: 'Beginner\'s Chicken Keeping Guide', desc: 'Our free PDF covering everything you need to know to start your first backyard flock — breeds, coop requirements, feeding, and health basics.' },
      { icon: '🌱', title: 'Starting a Kitchen Garden', desc: 'A seasonal planting guide for first-time gardeners. Know what to plant, when to plant it, and how to keep it alive.' },
      { icon: '🏡', title: 'Homestead Planning Worksheet', desc: 'A printable worksheet to help you dream, plan, and prioritize your homestead goals — whether you\'re on 1/4 acre or 40 acres.' },
    ]
  },
  {
    group: 'Favorite Books',
    items: [
      { icon: '📚', title: 'The Backyard Homestead', desc: 'By Carleen Madigan — the single best overview book we\'ve found for small-scale homesteading. Practical, thorough, and inspiring.' },
      { icon: '📖', title: 'Storey\'s Guide to Raising Chickens', desc: 'The chicken keeper\'s bible. If you have one chicken book, make it this one. Covers every breed, disease, and situation imaginable.' },
      { icon: '📗', title: 'Charlotte Mason Companion', desc: 'For those exploring the Charlotte Mason homeschool method — this is the most accessible and encouraging introduction we\'ve found.' },
    ]
  },
  {
    group: 'Our Recommendations',
    items: [
      { icon: '🛒', title: 'Coop & Feed Suppliers', desc: 'The brands and stores we actually use and trust for our flock. We only recommend what we\'ve personally tried and vetted.' },
      { icon: '🎥', title: 'Our YouTube Channel', desc: 'See everything in action — real, unfiltered homestead life. Subscribe for weekly videos on chickens, garden, and family rhythms.' },
      { icon: '🛍️', title: 'The Homestead Shop', desc: 'Digital guides, printables, and curated products we\'ve made or love. Check back often — we add new resources seasonally.' },
    ]
  },
]

export default function Resources() {
  return (
    <div>
      <PageHero
        kicker="Tools & guides"
        title="Resources"
        subtitle="Everything we've learned, gathered in one place for you"
        image="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1800&q=80"
      />

      <section className="page-content">
        <div className="page-content__inner page-content__inner--narrow">
          <div className="content-block fade-up">
            <span className="content-kicker">Why we share</span>
            <h2 className="section-title">Learning Together</h2>
            <div className="divider"><span>✦</span></div>
            <p>
              We are not experts. We're a family who jumped in, made plenty of mistakes, and kept going.
              Everything here is something we've either created from our own experience or something we've
              personally found helpful. We share it freely because someone generous shared with us first.
            </p>
          </div>
        </div>

        <div className="page-content__inner" style={{ marginTop: '4rem' }}>
          {resourceGroups.map((group) => (
            <div key={group.group} className="content-block fade-up" style={{ marginBottom: '4rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontStyle: 'italic', color: 'var(--brown-dark)', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--tan)' }}>
                {group.group}
              </h3>
              <div className="resources-grid">
                {group.items.map((item) => (
                  <div key={item.title} className="resource-item">
                    <span className="resource-item__icon">{item.icon}</span>
                    <div>
                      <div className="resource-item__title">{item.title}</div>
                      <p className="resource-item__desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="page-content__inner" style={{ marginTop: '2rem' }}>
          <div style={{ background: 'var(--brown-dark)', color: 'var(--parchment)', padding: '3.5rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-light)', display: 'block', marginBottom: '1rem' }}>Free download</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontStyle: 'italic', marginBottom: '1rem', color: 'var(--cream)' }}>The Beginner's Chicken Starter Kit</h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.8', marginBottom: '2rem', color: 'rgba(245,240,232,0.8)' }}>
              Everything you need to confidently start your first flock — a 20-page PDF with checklists, breed comparisons, coop plans, and our personal tips.
            </p>
            <button className="btn btn--primary" style={{ background: 'var(--rust)', borderColor: 'transparent' }}>
              Download Free Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
