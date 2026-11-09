import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import { currentMembers as bandMembers } from '../data/members'

const Home = () => {

  return (
    <div>
      {/* Hero Section */}
      {/* Temporary hero: Tracy's promo image (logo baked in) shown uncropped,
          with the pitch + buttons just below. Swap back to <Hero> once we have
          the new group shot from the 7/21 gig. */}
      <section className="pt-20 bg-band-dark">
        <img
          src="/hero-promo.jpg"
          alt="45th Parallel band on stage at sunset"
          className="w-full h-auto"
        />
        <div className="text-center px-4 sm:px-6 py-10 sm:py-12 max-w-3xl mx-auto">
          <p className="text-xl sm:text-2xl md:text-3xl text-band-highlight font-light mb-4">
            Portland Area Cover Band
          </p>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Playing hits from the 60s to the 2020s. Book us for your next event!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-lg">
              Book Us Now
            </Link>
            <Link
              to="/media"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold
                         hover:bg-white hover:text-band-dark transition-all duration-300"
            >
              Watch Us Play
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Who We Are</h2>
            <p className="section-subtitle">
              Four experienced musicians bringing decades of rock, blues, and everything in between
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
                      className={`w-full h-full object-cover transition-transform duration-500 ${member.imgClass || 'group-hover:scale-110'}`}
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
