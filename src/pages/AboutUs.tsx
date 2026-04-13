import PageHero from '../components/PageHero'
import './PageContent.css'

export default function AboutUs() {
  return (
    <div>
      <PageHero
        kicker="Get to know us"
        title="About Us"
        subtitle="A family choosing the slower, simpler, more intentional path"
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80"
      />

      <section className="page-content">
        <div className="page-content__inner page-content__inner--narrow">
          <div className="content-block fade-up">
            <span className="content-kicker">Our story</span>
            <h2 className="section-title">The Jacobs Family</h2>
            <div className="divider"><span>✦</span></div>
            <p>
              We are the Jacobs family — a husband and wife team, raising our children on a small homestead
              where every day is a new lesson in patience, gratitude, and the beauty of hard work.
              Several years ago, we traded the busyness of a conventional life for something that felt
              more aligned with our faith and values: growing food, raising animals, educating our children
              at home, and building a life with our own hands.
            </p>
            <p>
              What started with a few backyard chickens quickly grew into a full homesteading journey —
              a large vegetable garden, a small flock, homeschooling rhythms rooted in the seasons,
              and a deep desire to share everything we\'ve learned with families like yours.
            </p>
          </div>

          <div className="about-image-feature fade-up">
            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80" alt="The homestead" />
            <div className="about-image-caption">Our little corner of the world</div>
          </div>

          <div className="content-block fade-up">
            <span className="content-kicker">What we believe</span>
            <h2 className="section-title">Rooted in Faith & Family</h2>
            <div className="divider"><span>✦</span></div>
            <p>
              Our faith is the foundation of everything we do here. We believe that tending the earth,
              nurturing children, and building community are sacred callings — and we live that conviction
              every single day.
            </p>
            <p>
              We\'re not perfect homesteaders. We make mistakes, we learn, we adapt. But we share every
              part of the journey — the victories and the failures — because we believe that real,
              honest storytelling is more valuable than a perfectly curated feed.
            </p>
          </div>

          <div className="values-grid fade-up">
            {[
              { icon: '🙏', title: 'Faith', desc: 'Everything we do is guided by our faith and the belief that this life is a gift worth stewarding well.' },
              { icon: '👨‍👩‍👧‍👦', title: 'Family', desc: 'Our children are at the center of this homestead. We build this life for them and with them.' },
              { icon: '🌱', title: 'Simplicity', desc: 'Less noise, more meaning. We choose simplicity over convenience whenever possible.' },
              { icon: '🤝', title: 'Community', desc: 'We believe we\'re better together. This space is for sharing, learning, and growing alongside one another.' },
            ].map((v, i) => (
              <div key={i} className="value-card">
                <span className="value-card__icon">{v.icon}</span>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
