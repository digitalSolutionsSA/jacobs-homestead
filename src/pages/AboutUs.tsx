import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './PageContent.css'

export default function AboutUs() {
  return (
    <div>
      <PageHero
        kicker="Get to know us"
        title="Our Story"
        subtitle="Cultivating Faith, Family, and Purpose"
        image="public/story2.jpeg"
      />

      <section className="page-content">
        <div className="page-content__inner page-content__inner--narrow">
          <div className="content-block fade-up">
            <span className="content-kicker">Our story</span>
            <h2 className="section-title">Cultivating Faith, Family, and Purpose</h2>
            <div className="divider"><span>✦</span></div>
            <p>
              The Jacobs Homestead began with a simple desire: to build a life centred on faith, family, and purpose.
            </p>
            <p>
              In a world that moves faster every day, we felt called to slow down and focus on what truly matters.
              We are passionate about raising our son in an environment filled with wonder, learning, responsibility,
              and a deep appreciation for God's creation.
            </p>
            <p>
              Our days are spent homeschooling, tending to our animals, growing food, learning new skills, and
              embracing the beauty of a more intentional way of life. Not because it is always easy, but because we
              believe there is value in working with our hands, stewarding the land, and creating a home where faith
              can flourish.
            </p>
            <p>
              Jacobs Homestead is more than a place—it is a journey. A journey of learning, growing, trusting God,
              and sharing both the triumphs and challenges along the way.
            </p>
            <p>
              Whether you're here for homesteading inspiration, gardening tips, homeschooling adventures,
              faith-filled encouragement, or simply a glimpse into our everyday life, we're glad you're here.
            </p>
            <p>
              Welcome to our homestead. We hope you'll stay awhile.
            </p>
          </div>

          <div className="about-image-feature fade-up">
            <img src="public/jacobs.jpeg" alt="The homestead" />
            <div className="about-image-caption">Our little corner of the world</div>
          </div>

          <div className="content-block fade-up">
            <span className="content-kicker">What we believe</span>
            <h2 className="section-title">Rooted in Christ & Family</h2>
            <div className="divider"><span>✦</span></div>
            <p>
              Our faith in Jesus Christ is at the heart of everything we do. We believe that family is one of God's
              greatest gifts, and we are committed to building a home filled with love, grace, learning, and purpose.
              As we journey through homesteading and homeschooling, we trust God to lead us every step of the way.
            </p>
          </div>

          <div className="fade-up" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/blog" className="btn btn--outline">Read the Blog</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
