import { useEffect, useState } from 'react'
import { fetchEvents, upcomingSorted, formatDateParts, mapsUrl } from '../lib/events'

const FacebookIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
  </svg>
)

// Big highlighted card for the very next show.
const FeaturedShow = ({ event }) => {
  const { weekday, month, day, year } = formatDateParts(event.date)
  return (
    <div className="bg-band-dark text-white rounded-2xl overflow-hidden shadow-xl">
      <div className="bg-band-highlight px-6 py-2">
        <span className="text-sm font-semibold uppercase tracking-widest">Next Up</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 p-6 md:p-8">
        {/* Date block */}
        <div className="flex-shrink-0 bg-white/10 rounded-xl px-6 py-4 text-center min-w-[7rem]">
          <div className="text-band-highlight font-display text-2xl tracking-wider">{month}</div>
          <div className="text-5xl font-display leading-none">{day}</div>
          <div className="text-gray-300 text-sm mt-1">{year}</div>
        </div>
        {/* Details */}
        <div className="flex-grow text-center sm:text-left flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-display tracking-wide">{event.venue}</h3>
          {event.address ? (
            <a
              href={mapsUrl(event.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 mt-1 hover:text-white transition-colors inline-flex items-center justify-center sm:justify-start gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.address}
            </a>
          ) : (
            <p className="text-gray-300 mt-1">{event.city}</p>
          )}
          <p className="text-band-highlight font-semibold mt-2">
            {weekday} &middot; {event.time}
          </p>
        </div>
        {/* Action */}
        {event.fbUrl && (
          <div className="flex items-center">
            <a
              href={event.fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-band-highlight text-white px-5 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              <FacebookIcon />
              Event Details
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// Compact row card for the remaining upcoming shows.
const ShowCard = ({ event }) => {
  const { weekday, month, day, year } = formatDateParts(event.date)
  return (
    <div className="flex items-center gap-5 bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
      {/* Date block */}
      <div className="flex-shrink-0 bg-band-light rounded-lg px-4 py-3 text-center min-w-[5.5rem]">
        <div className="text-band-highlight font-display text-xl tracking-wider">{month}</div>
        <div className="text-3xl font-display text-band-dark leading-none">{day}</div>
        <div className="text-gray-400 text-xs mt-1">{year}</div>
      </div>
      {/* Details */}
      <div className="flex-grow">
        <h3 className="text-xl font-display tracking-wide text-band-dark">{event.venue}</h3>
        {event.address ? (
          <a
            href={mapsUrl(event.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 text-sm hover:text-band-highlight transition-colors"
          >
            {event.address}
          </a>
        ) : (
          <p className="text-gray-600 text-sm">{event.city}</p>
        )}
        <p className="text-gray-500 text-sm mt-1">
          {weekday} &middot; {event.time}
        </p>
      </div>
      {/* Action */}
      {event.fbUrl && (
        <a
          href={event.fbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 text-band-highlight hover:text-band-dark font-semibold text-sm transition-colors"
          aria-label="Facebook event details"
        >
          <FacebookIcon />
          <span className="hidden sm:inline">Details</span>
        </a>
      )}
    </div>
  )
}

const Calendar = () => {
  const [events, setEvents] = useState(null) // null = loading

  useEffect(() => {
    let active = true
    fetchEvents().then((data) => {
      if (active) setEvents(upcomingSorted(data))
    })
    return () => {
      active = false
    }
  }, [])

  const [featured, ...rest] = events || []

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-6 bg-band-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-display mb-2">Upcoming Shows</h1>
          <p className="text-base text-gray-300">Catch 45th Parallel live!</p>
        </div>
      </section>

      {/* Shows Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {events === null ? (
            /* Loading */
            <p className="text-center text-gray-400 py-12">Loading shows&hellip;</p>
          ) : events.length === 0 ? (
            /* Empty state */
            <div className="text-center bg-band-light rounded-2xl p-10">
              <h2 className="text-2xl font-display text-band-dark mb-3">No shows on the calendar right now</h2>
              <p className="text-gray-600 mb-6">
                We&rsquo;re busy booking our next gigs. Follow us on Facebook to be the first to know!
              </p>
              <a
                href="https://www.facebook.com/p/45th-Parallel-100075966731209/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <FacebookIcon />
                Follow on Facebook
              </a>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured next show */}
              <FeaturedShow event={featured} />

              {/* Remaining shows */}
              {rest.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-display tracking-wide text-band-dark text-center">
                    More Upcoming Shows
                  </h2>
                  {rest.map((event) => (
                    <ShowCard key={event.id} event={event} />
                  ))}
                </div>
              )}

              <p className="text-center text-gray-400 text-sm">All times are Pacific (PT)</p>
            </div>
          )}
        </div>
      </section>

      {/* Follow for Updates */}
      <section className="py-12 bg-band-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-semibold text-band-dark mb-4">Stay Updated</h3>
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
              <FacebookIcon />
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
            We&rsquo;re available for weddings, corporate events, private parties, bars, breweries, and festivals.
          </p>
          <a
            href="mailto:info@45thparallel.band?subject=Booking%20Inquiry%20-%2045th%20Parallel"
            className="btn-primary"
          >
            Email Us to Book
          </a>
        </div>
      </section>
    </div>
  )
}

export default Calendar
