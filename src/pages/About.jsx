import { currentMembers as bandMembers } from '../data/members'

const About = () => {

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-6 bg-band-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-display mb-2">About The Band</h1>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            Four seasoned musicians with decades of combined experience, united by a love for great music
            and a passion for live performance.
          </p>
        </div>
      </section>

      {/* Band Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-8">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              45th Parallel came together through a shared love of music and years of experience playing
              in bands across the country. What started as "Beverly Hillsboro" evolved into something
              special when the current lineup came together in 2022.
            </p>
            <p className="mb-6">
              Based in Hillsboro, Oregon, we bring together musicians from diverse backgrounds - from
              the blues clubs of Chicago to the stages of Southern California and Portland. This mix of
              influences allows us to cover an incredible range of music, from the British Invasion
              of the 60s to today's chart-toppers.
            </p>
            <p>
              Whether we're playing a wedding, corporate event, brewery, or festival, our goal is
              always the same: get people dancing, singing along, and having the time of their lives.
            </p>
          </div>
        </div>
      </section>

      {/* Band Members Section */}
      <section className="py-20 bg-band-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-16">Meet The Band</h2>

          <div className="space-y-16">
            {bandMembers.map((member, index) => (
              <div
                key={member.name}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 lg:gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/3">
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full aspect-square object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-square bg-band-accent flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <svg className="w-20 h-20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <p className="text-sm">Photo coming soon</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-2xl font-display text-white">{member.name}</h3>
                      <p className="text-band-highlight">{member.role}</p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="w-full lg:w-2/3">
                  <div className="bg-white rounded-2xl p-8 shadow-lg space-y-4">
                    {member.bio.trim().split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Bring Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">What We Bring To Your Event</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-band-light rounded-2xl">
              <div className="w-16 h-16 bg-band-highlight rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-band-dark mb-4">Six Decades of Hits</h3>
              <p className="text-gray-600">
                From the 60s to today, we play the songs everyone knows and loves. Something for every generation.
              </p>
            </div>

            <div className="text-center p-8 bg-band-light rounded-2xl">
              <div className="w-16 h-16 bg-band-highlight rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-band-dark mb-4">Professional Experience</h3>
              <p className="text-gray-600">
                Decades of combined experience means reliable, polished performances every time.
              </p>
            </div>

            <div className="text-center p-8 bg-band-light rounded-2xl">
              <div className="w-16 h-16 bg-band-highlight rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-band-dark mb-4">High Energy Fun</h3>
              <p className="text-gray-600">
                We bring the energy and get the crowd moving. Your guests will be dancing all night.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
