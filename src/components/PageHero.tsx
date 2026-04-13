import './PageHero.css'

interface PageHeroProps {
  title: string
  subtitle?: string
  image: string
  kicker?: string
}

export default function PageHero({ title, subtitle, image, kicker }: PageHeroProps) {
  return (
    <section className="page-hero" style={{ backgroundImage: `url('${image}')` }}>
      <div className="page-hero__overlay" />
      <div className="page-hero__content fade-up">
        {kicker && <p className="page-hero__kicker">{kicker}</p>}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
        <div className="page-hero__ornament">
          <span />
          <span>✦</span>
          <span />
        </div>
      </div>
    </section>
  )
}
