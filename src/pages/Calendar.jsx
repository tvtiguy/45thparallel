const Calendar = () => {
  // Google Calendar embed URL for info@45thparallel.band
  // The calendar must be set to "public" in Google Calendar settings for this to work
  const calendarEmail = 'info@45thparallel.band'
  const calendarEmbedUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarEmail)}&ctz=America/Los_Angeles&mode=MONTH&showTitle=0&showNav=1&showPrint=0&showTabs=0&showCalendars=0`

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-6 bg-band-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-display mb-2">Upcoming Shows</h1>
          <p className="text-base text-gray-300">
            Catch 45th Parallel live!
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-6 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-band-dark text-center mb-1">Our Schedule</h2>
          <p className="text-center text-xl text-gray-700 mb-4">
            <span className="font-semibold text-band-highlight">Next Up:</span> Last Lap January 30th
          </p>

          {/* Google Calendar Embed */}
          <div className="bg-band-light rounded-2xl p-4 md:p-6 shadow-lg">
            <iframe
              src={calendarEmbedUrl}
              className="w-full rounded-xl"
              style={{ border: 0, minHeight: '600px' }}
              title="45th Parallel Event Calendar"
              loading="lazy"
            />
          </div>

          <p className="text-center text-gray-500 text-sm mt-4">
            All times are Pacific Time (PT)
          </p>
        </div>
      </section>

      {/* Follow for Updates */}
      <section className="py-12 bg-band-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-semibold text-band-dark mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 mb-6">
            Follow us on social media for the latest show announcements!
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/p/45th-Parallel-100075966731209/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
              </svg>
              Follow on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Book Us CTA */}
      <section className="py-12 bg-band-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-display mb-3">Want 45th Parallel At Your Event?</h2>
          <p className="text-gray-300 mb-6">
            We're available for weddings, corporate events, private parties, bars, breweries, and festivals.
          </p>
          <a href="mailto:info@45thparallel.band?subject=Booking%20Inquiry%20-%2045th%20Parallel" className="btn-primary">
            Email Us to Book
          </a>
        </div>
      </section>
    </div>
  )
}

export default Calendar
