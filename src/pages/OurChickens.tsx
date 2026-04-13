import PageHero from '../components/PageHero'
import './PageContent.css'

const breeds = [
  {
    name: 'Buff Orpington',
    desc: 'Our most docile and friendly breed — perfect for families with children. Excellent layers of large brown eggs and wonderfully calm temperament.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300&q=80',
    eggs: '280 eggs/year',
    color: 'Golden buff',
  },
  {
    name: 'Black Australorp',
    desc: 'Record-breaking layers and incredibly gentle birds. Their stunning black-green iridescent feathers make them a beautiful addition to any flock.',
    image: 'https://images.unsplash.com/photo-1569197645040-f5d8eea706e6?w=300&q=80',
    eggs: '300+ eggs/year',
    color: 'Glossy black',
  },
  {
    name: 'Easter Egger',
    desc: 'The crowd favorites! These charming birds lay beautiful blue, green, and olive-colored eggs. Each one is unique in both personality and appearance.',
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=300&q=80',
    eggs: '250 eggs/year',
    color: 'Blue, green, olive',
  },
  {
    name: 'Rhode Island Red',
    desc: 'Hardy, adaptable, and reliable layers. These are the workhorses of our flock — dependable through all seasons and easy to care for.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=300&q=80',
    eggs: '260 eggs/year',
    color: 'Rich brown',
  },
]

const tips = [
  { icon: '🏡', title: 'Coop Requirements', desc: '4 sq ft per bird inside, 10 sq ft outside. Good ventilation is critical — more important than insulation in most climates.' },
  { icon: '🌾', title: 'Feeding Basics', desc: 'Layer pellets for hens over 18 weeks. Fresh water always available. Supplement with scratch, greens, and kitchen scraps.' },
  { icon: '🥚', title: 'Egg Collection', desc: 'Collect eggs twice daily to discourage broodiness and keep eggs clean. Refrigerate within 2 hours in warm weather.' },
  { icon: '🏥', title: 'Flock Health', desc: 'Watch for behavioral changes — a sick bird will separate from the flock. Annual worming and regular coop cleaning prevent most issues.' },
  { icon: '🐣', title: 'Getting Started', desc: 'Start with 3–6 pullets (young hens). Chicks need a brooder with heat lamp for 6 weeks before moving to the coop.' },
  { icon: '❄️', title: 'Winter Care', desc: 'Chickens are hardier than you think. Focus on dry bedding, draft-free coops, and fresh unfrozen water rather than heat lamps.' },
]

export default function OurChickens() {
  return (
    <div>
      <PageHero
        kicker="Life with our flock"
        title="Our Chickens"
        subtitle="Heritage breeds, backyard flocks, and the joy of farm-fresh eggs"
        image="https://images.unsplash.com/photo-1569197645040-f5d8eea706e6?w=1800&q=80"
      />

      <section className="page-content">
        <div className="page-content__inner page-content__inner--narrow">
          <div className="content-block fade-up">
            <span className="content-kicker">Our flock story</span>
            <h2 className="section-title">From Six Hens to a Full Homestead Flock</h2>
            <div className="divider"><span>✦</span></div>
            <p>
              It all started with six Buff Orpington chicks in a cardboard brooder box in our laundry room. We had
              no idea what we were doing — we just knew we wanted fresh eggs and a deeper connection to where our
              food came from. That was several years and many, many chickens ago.
            </p>
            <p>
              Today our flock is one of the most rewarding parts of homestead life. The kids have learned
              responsibility, patience, and the remarkable cycle of life through caring for our birds. And honestly?
              There is nothing like an egg from a hen you raised yourself.
            </p>
          </div>
        </div>

        <div className="page-content__inner" style={{ marginTop: '4rem' }}>
          <div className="content-block fade-up">
            <span className="content-kicker">Meet the birds</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Our Heritage Breeds</h2>
            <div className="divider" style={{ margin: '1rem auto 3rem' }}><span>✦</span></div>
            <div className="chicken-breeds">
              {breeds.map((breed) => (
                <div key={breed.name} className="breed-card">
                  <img src={breed.image} alt={breed.name} className="breed-card__img" />
                  <div className="breed-card__info">
                    <h3>{breed.name}</h3>
                    <p>{breed.desc}</p>
                    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1.5rem' }}>
                      <small style={{ color: 'var(--rust)', fontFamily: 'var(--font-serif)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>🥚 {breed.eggs}</small>
                      <small style={{ color: 'var(--brown-light)', fontFamily: 'var(--font-serif)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>🎨 {breed.color}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="page-content__inner" style={{ marginTop: '5rem' }}>
          <div className="content-block fade-up">
            <span className="content-kicker" style={{ textAlign: 'center', display: 'block' }}>Practical guidance</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Chicken Keeping Basics</h2>
            <div className="divider" style={{ margin: '1rem auto 3rem' }}><span>✦</span></div>
            <div className="resources-grid">
              {tips.map((tip) => (
                <div key={tip.title} className="resource-item">
                  <span className="resource-item__icon">{tip.icon}</span>
                  <div>
                    <div className="resource-item__title">{tip.title}</div>
                    <p className="resource-item__desc">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
