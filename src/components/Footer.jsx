import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/p/45th-Parallel-100075966731209/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@45parallel',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-band-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-display tracking-wider">45th PARALLEL</h3>
            <p className="text-gray-400 text-sm">
              Your premier cover band from Hillsboro, Oregon.
              Bringing the hits to your events with energy and style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-band-highlight transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-band-highlight transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-400 hover:text-band-highlight transition-colors">
                  Shows
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-gray-400 hover:text-band-highlight transition-colors">
                  Media
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-band-highlight transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <p className="text-gray-400 text-sm">
              Hillsboro, Oregon
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-band-highlight transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} 45th Parallel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
