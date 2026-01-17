import { useState } from 'react'

const Media = () => {
  const [activeVideo, setActiveVideo] = useState(null)

  const videos = [
    { id: 'vJuM5f8g51Y', title: 'Stray Cat Strut' },
    { id: 'JgEBXgexupI', title: 'Your Mama Don\'t Dance' },
    { id: 'Hpl_4A8jROY', title: 'Come Together' },
    { id: 'wVVwdsfuPY4', title: 'Gimme Three Steps' },
  ]

  const closeModal = () => setActiveVideo(null)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-6 bg-band-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-display mb-2">Media</h1>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Watch us in action and hear what 45th Parallel sounds like live.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-8">Videos</h2>

          {videos.length > 0 ? (
            /* Video Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="cursor-pointer group"
                  onClick={() => setActiveVideo(video)}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    {/* YouTube Thumbnail */}
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to lower quality thumbnail if maxres not available
                        e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                      }}
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 font-semibold text-band-dark group-hover:text-band-highlight transition-colors">
                    {video.title}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            /* No videos yet - show YouTube channel link */
            <div className="bg-band-light rounded-2xl p-8 md:p-12 text-center mb-12">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-band-dark mb-4">
                Check Out Our YouTube Channel
              </h3>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Head over to our YouTube channel to see our live performances and recordings.
              </p>
              <a
                href="https://www.youtube.com/@45parallel"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch on YouTube
              </a>
            </div>
          )}

          {/* YouTube Channel Link (always show) */}
          {videos.length > 0 && (
            <div className="text-center">
              <a
                href="https://www.youtube.com/@45parallel"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-band-highlight hover:text-band-dark transition-colors font-semibold"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                See More on YouTube
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-band-highlight transition-colors"
            onClick={closeModal}
            aria-label="Close video"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Music Section */}
      <section className="py-16 bg-band-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-4">What We Play</h2>
          <p className="text-center text-gray-600 mb-12">
            A taste of the hits we cover - from the 60s to today
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { decade: '60s & 70s', artists: 'Van Morrison, The Doors, CCR, Eagles, The Who, Eric Clapton, Led Zeppelin, Buffalo Springfield' },
              { decade: '80s', artists: 'Stray Cats, Tom Petty, John Mellencamp, The Cars, Billy Joel, Cheap Trick, Ramones' },
              { decade: '90s', artists: 'The Cure, Counting Crows, Chumbawamba, Spin Doctors, Hootie & the Blowfish, Radiohead' },
              { decade: '2000s & Beyond', artists: 'Green Day, The Black Keys, Ricky Martin, Luke Bryan' },
            ].map((era) => (
              <div key={era.decade} className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-display text-band-highlight mb-2">{era.decade}</h3>
                <p className="text-gray-600 text-sm">{era.artists}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700">
              Want to know if we play a specific song? Just ask!{' '}
              <a href="mailto:info@45thparallel.band" className="text-band-highlight hover:underline">
                Email us
              </a>{' '}
              with your song requests.
            </p>
          </div>
        </div>
      </section>

      {/* Social Follow Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold text-band-dark mb-6">Follow Us For More</h3>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.facebook.com/p/45th-Parallel-100075966731209/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
              </svg>
              <span className="font-medium">Facebook</span>
            </a>
            <a
              href="https://www.youtube.com/@45parallel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="font-medium">YouTube</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Media
