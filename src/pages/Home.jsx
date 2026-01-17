import { Link } from 'react-router-dom'
import Hero from '../components/Hero'

const Home = () => {
  const bandMembers = [
    {
      name: 'Mark Watson',
      role: 'Guitar & Vocals',
      image: 'https://images.squarespace-cdn.com/content/v1/67d2399dd7fcaf11782ef34b/2d4f4a97-6065-4f67-8d5c-905bdd217db0/IMG_6610.jpg',
    },
    {
      name: 'Rich Boam',
      role: 'Drums & Vocals',
      image: 'https://images.squarespace-cdn.com/content/v1/67d2399dd7fcaf11782ef34b/416e4f19-5c0e-425f-848b-27bc22d3cccd/IMG_20220504_140420446-1.jpg',
    },
    {
      name: 'Bruce Rupprecht',
      role: 'Bass & Vocals',
      image: 'https://images.squarespace-cdn.com/content/v1/67d2399dd7fcaf11782ef34b/b727ea3d-7ff8-4bb0-a158-930048b76051/IMG_6811.jpg',
    },
    {
      name: 'John Wesson',
      role: 'Guitar & Vocals',
      image: 'https://images.squarespace-cdn.com/content/v1/67d2399dd7fcaf11782ef34b/36e315c2-cced-4007-8013-8bc2cef95d87/JohnEdited.png',
    },
    {
      name: 'Mark Moulding',
      role: 'Keyboards',
      image: null,
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="45th PARALLEL"
        subtitle="Portland Area Cover Band"
        description="Playing hits from the 60s to the 2020s. Book us for your next event!"
        backgroundImage="https://images.squarespace-cdn.com/content/v1/67d2399dd7fcaf11782ef34b/17d51b53-c7f4-4ee9-9f5d-77137da00ccf/P1040590+2.JPG"
      />

      {/* About Teaser Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Who We Are</h2>
            <p className="section-subtitle">
              Five experienced musicians bringing decades of rock, blues, and everything in between
              to stages across the Portland metro area.
            </p>
          </div>

          {/* Band Members Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {bandMembers.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-band-accent flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="font-semibold text-band-dark">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/about" className="btn-secondary">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* What We Play Section */}
      <section className="py-20 bg-band-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">What We Play</h2>
            <p className="section-subtitle">
              From classic rock to modern hits, we cover it all.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['60s', '70s', '80s', '90s', '00s', '2020s'].map((decade) => (
              <div
                key={decade}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-3xl font-display text-band-highlight">{decade}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Rock, blues, pop, country - we bring the songs everyone knows and loves.
              Perfect for weddings, corporate events, private parties, bars, breweries, and festivals.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-band-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-display mb-6">Ready to Rock Your Event?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Let's make your next event unforgettable. Get in touch to check availability and book 45th Parallel.
          </p>
          <Link to="/contact" className="btn-primary text-lg">
            Book Us Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
