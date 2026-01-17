const Contact = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-6 bg-band-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-display mb-2">Contact Us</h1>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Ready to make your event unforgettable? Get in touch!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Main CTA */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-display text-band-dark mb-6">Let's Talk</h2>
              <p className="text-gray-600 mb-8">
                Interested in booking 45th Parallel for your event? Have questions about our availability
                or song list? Drop us an email and we'll get back to you within 24-48 hours.
              </p>

              <a
                href="mailto:info@45thparallel.band?subject=Booking%20Inquiry%20-%2045th%20Parallel"
                className="btn-primary inline-flex items-center gap-3 text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>

              <p className="mt-4 text-gray-500">
                info@45thparallel.band
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-band-highlight rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-band-dark mb-1">Based In</h3>
                  <p className="text-gray-700">Hillsboro, Oregon</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Serving the greater Portland metro area
                  </p>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-band-highlight rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-band-dark mb-2">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.facebook.com/p/45th-Parallel-100075966731209/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.youtube.com/@45parallel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-red-600 transition-colors"
                      aria-label="YouTube"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Types */}
          <div className="mt-16 p-8 bg-band-light rounded-2xl">
            <h3 className="font-semibold text-band-dark mb-6 text-center text-xl">Events We Play</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {['Weddings', 'Corporate Events', 'Private Parties', 'Bars & Breweries', 'Festivals & Fairs', 'Community Events'].map((event) => (
                <div key={event} className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-band-highlight flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {event}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-band-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: 'What kind of music do you play?',
                a: 'We play hits from the 60s through the 2020s - rock, blues, pop, country, and more. Our setlist includes songs that get everyone up and dancing.',
              },
              {
                q: 'How far in advance should I book?',
                a: 'We recommend booking at least 4-6 weeks in advance, especially for weekend events. Popular dates can fill up quickly, so the earlier you reach out, the better!',
              },
              {
                q: 'Do you take song requests?',
                a: "We love song requests! Let us know your must-play songs when booking, and we'll do our best to include them in our set.",
              },
              {
                q: 'What area do you serve?',
                a: 'We\'re based in Hillsboro, Oregon and serve the entire Portland metro area and beyond. Travel fees may apply for events outside our usual range.',
              },
              {
                q: 'How long do you typically play?',
                a: 'Standard sets are typically 3-4 hours with breaks. We can customize our performance length to fit your event needs.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-band-dark mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
