import { Reveal } from '../components/Motion'
import { PageHero, CTABand } from '../components/Shared'

const posts = [
  {
    date: 'Oct 27, 2026',
    title: 'Self-Leveling Epoxy Flooring Systems Explained',
    excerpt: 'How specialised coatings spread across a prepared surface to create an even, seamless finish with minimal visible joints.',
    image: '/images/gym-equipment.jpg',
  },
  {
    date: 'Oct 14, 2026',
    title: 'Types Of Running Track Surfaces For Athletics Performance',
    excerpt: 'From school playgrounds to professional stadiums — how the right track supports speed, comfort and stability.',
    image: '/images/track-hero.jpg',
  },
  {
    date: 'Sep 18, 2026',
    title: 'Step-By-Step Process Of EPDM Granule Installation For Running Tracks',
    excerpt: 'Preparation, mixing, levelling and curing — get these steps right and the track performs for years.',
    image: '/images/runner.jpg',
  },
  {
    date: 'Sep 16, 2026',
    title: 'How To Maintain A Football Turf Ground For Long-Term Performance?',
    excerpt: 'Even the toughest turf needs a little love. Regular maintenance keeps it safe, comfortable and ready.',
    image: '/images/football-field.jpg',
  },
  {
    date: 'Aug 26, 2026',
    title: 'How Rubber Flooring Supports Safety and Comfort in Active Spaces',
    excerpt: 'The right surface makes a space safer, more comfortable and easier to maintain — gyms, tracks and playgrounds.',
    image: '/images/gym-dark.jpg',
  },
  {
    date: 'Aug 18, 2026',
    title: 'Why Quality Materials Matter in Long-Lasting Sports Flooring Systems',
    excerpt: 'Players run, jump and land with force for hours a day. Here is why material quality decides the lifespan.',
    image: '/images/basketball.jpg',
  },
  {
    date: 'Jul 24, 2026',
    title: 'How to Choose the Best Sports Flooring in India for Your Facility',
    excerpt: 'Safety, game performance, maintenance costs and lifespan — choosing well beyond appearance.',
    image: '/images/court-outdoor.jpg',
  },
  {
    date: 'Jul 17, 2026',
    title: 'Sports Infrastructure in India: Growth, Challenges, and Future Prospects',
    excerpt: 'Badminton, football, athletics, hockey and pickleball are driving demand for quality infrastructure.',
    image: '/images/stadium.jpg',
  },
  {
    date: 'Jun 23, 2026',
    title: 'Badminton Court Flooring: PVC vs Acrylic vs Wooden – Which Is Best for India?',
    excerpt: 'The three most common options compared on safety, comfort, maintenance and long-term performance.',
    image: '/images/gym.jpg',
  },
  {
    date: 'Jun 16, 2026',
    title: 'Pickleball Court Flooring in India: Cost, Materials & What You Need to Know',
    excerpt: 'The surface plays a major role in performance, player safety and long-term maintenance costs.',
    image: '/images/tennis.jpg',
  },
  {
    date: 'May 18, 2026',
    title: 'PP Interlocking Tiles vs PVC Flooring: Which Is Better?',
    excerpt: 'Smooth and cushioned, or interlocking plastic tiles? Two popular options, compared.',
    image: '/images/cycling.jpg',
  },
  {
    date: 'Mar 17, 2026',
    title: 'Why Quality PU Binder Matters for Long-Lasting Sports Surfaces',
    excerpt: 'The binder is the adhesive that holds rubber granules together — its quality decides durability.',
    image: '/images/stadium-aerial.jpg',
  },
]

export default function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={<>Notes from <span className="accent italic">the factory floor</span></>}
        lead="Guides, comparisons and updates from the team that manufactures your sports surfaces."
        word="Journal"
        crumb={[{ label: 'Blog' }]}
      />
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="container">
          <div className="blog-grid">
            {posts.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.07}>
                <article className="blog-card">
                  <div className="media"><img src={p.image} alt={p.title} loading="lazy" /></div>
                  <div className="body">
                    <span className="date mono">{p.date}</span>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  )
}