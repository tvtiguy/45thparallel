import { Link } from 'react-router-dom'

const Hero = ({
  title = "45th PARALLEL",
  subtitle = "Hillsboro's Premier Cover Band",
  description = "Bringing the hits to your events with energy, passion, and unforgettable performances.",
  showButtons = true,
  backgroundImage = null,
  overlay = true,
  size = "full" // "full" or "medium"
}) => {
  const heightClass = size === "full" ? "min-h-screen" : "min-h-[60vh]"

  return (
    <section
      className={`relative ${heightClass} flex items-center justify-center`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      {/* Overlay */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 gradient-overlay"></div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display text-white tracking-wider mb-4 text-shadow animate-fade-in">
          {title}
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-band-highlight font-light mb-6">
          {subtitle}
        </p>

        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          {description}
        </p>

        {showButtons && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary text-lg"
            >
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
        )}
      </div>

      {/* Scroll Indicator */}
      {size === "full" && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-white opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      )}
    </section>
  )
}

export default Hero
