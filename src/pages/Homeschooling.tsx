import PageHero from '../components/PageHero'
import './PageContent.css'

const subjects = [
  { icon: '📖', title: 'Language Arts', desc: 'We use Charlotte Mason-inspired narration, living books, and nature journals to build strong readers and writers.' },
  { icon: '🔢', title: 'Mathematics', desc: 'Hands-on, conceptual math through real-life homestead applications — measuring the garden, calculating feed ratios, tracking egg counts.' },
  { icon: '🌱', title: 'Nature Science', desc: 'The homestead is our science lab. Soil biology, animal husbandry, plant cycles, and seasonal observation are our curriculum.' },
  { icon: '✝️', title: 'Faith & Character', desc: 'Scripture memory, Bible study, and character training woven through every subject and every moment of our day.' },
  { icon: '🎨', title: 'Fine Arts', desc: 'Drawing, watercolor, folk art traditions, and music — creativity is not a bonus, it\'s a core part of who we are.' },
  { icon: '🏛️', title: 'History', desc: 'Story-based history through living books and biographies. We learn history through the people who lived it, not textbooks.' },
]

const rhythms = [
  { time: '7:00 AM', activity: 'Morning chores — feed chickens, collect eggs, water garden' },
  { time: '8:00 AM', activity: 'Breakfast together as a family' },
  { time: '8:30 AM', activity: 'Morning basket — prayer, hymn, poetry, and memory work' },
  { time: '9:00 AM', activity: 'Core academics — language arts and math' },
  { time: '11:00 AM', activity: 'Nature study, science, or history read-aloud' },
  { time: '12:30 PM', activity: 'Lunch and free play outside' },
  { time: '2:00 PM', activity: 'Art, music, or independent reading' },
  { time: '3:30 PM', activity: 'Afternoon chores and outdoor projects' },
]

export default function Homeschooling() {
  return (
    <div>
      <PageHero
        kicker="Education at home"
        title="Homeschooling"
        subtitle="Faith-centered, nature-rich learning woven through everyday homestead life"
        image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1800&q=80"
      />

      <section className="page-content">
        <div className="page-content__inner page-content__inner--narrow">
          <div className="content-block fade-up">
            <span className="content-kicker">Our philosophy</span>
            <h2 className="section-title">Why We Homeschool</h2>
            <div className="divider"><span>✦</span></div>
            <p>
              We didn't start homeschooling because we thought we could do it better than anyone else. We started
              because we believe the home is the most powerful learning environment a child can have — and the
              homestead makes it even richer.
            </p>
            <p>
              Our approach is rooted in the Charlotte Mason philosophy: living books instead of dry textbooks,
              time in nature as non-negotiable, and the belief that children are whole persons, not empty vessels
              to be filled with information. We layer our faith through every subject and every day.
            </p>
          </div>
        </div>

        <div className="page-content__inner" style={{ marginTop: '4rem' }}>
          <div className="content-block fade-up">
            <span className="content-kicker" style={{ textAlign: 'center', display: 'block' }}>What we teach</span>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Our Curriculum Subjects</h2>
            <div className="divider" style={{ margin: '1rem auto 3rem' }}><span>✦</span></div>
            <div className="curriculum-cards">
              {subjects.map((s) => (
                <div key={s.title} className="curriculum-card">
                  <span className="curriculum-card__icon">{s.icon}</span>
                  <h3 className="curriculum-card__title">{s.title}</h3>
                  <p className="curriculum-card__desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="page-content__inner" style={{ marginTop: '5rem' }}>
          <div className="content-block fade-up" style={{ background: 'var(--parchment)', padding: '3rem', maxWidth: '760px', margin: '0 auto' }}>
            <span className="content-kicker" style={{ textAlign: 'center', display: 'block' }}>A day in our life</span>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Our Daily Rhythm</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {rhythms.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem', padding: '1rem 0', borderBottom: i < rhythms.length - 1 ? '1px solid var(--tan)' : 'none', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--rust)', minWidth: '70px', paddingTop: '2px' }}>{r.time}</span>
                  <span style={{ color: 'var(--brown-dark)', fontSize: '1rem', fontFamily: 'var(--font-body)' }}>{r.activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
