# 45th Parallel Band Website

A modern, responsive website for 45th Parallel, a cover band from Hillsboro, Oregon.

## Tech Stack

- **React** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation

## Getting Started

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation bar with mobile menu
│   ├── Footer.jsx      # Site footer with social links
│   ├── Hero.jsx        # Hero section component
│   ├── ContactForm.jsx # Booking inquiry form
│   ├── PhotoGallery.jsx # Photo grid with lightbox
│   └── VideoPlayer.jsx # YouTube video embeds
├── pages/              # Page components
│   ├── Home.jsx        # Homepage
│   ├── About.jsx       # Band bios and story
│   ├── Gallery.jsx     # Photo gallery
│   ├── Media.jsx       # Videos and song list
│   ├── Calendar.jsx    # Upcoming shows
│   └── Contact.jsx     # Booking form and contact info
├── App.jsx             # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Tailwind + custom styles
```

## Customization

### Contact Form

The contact form uses Formspree. To enable it:

1. Create a free account at [Formspree](https://formspree.io)
2. Create a new form and get your form ID
3. Update `src/components/ContactForm.jsx`:
   ```javascript
   const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'
   ```

### Adding Photos to Gallery

Edit `src/pages/Gallery.jsx` and update the `photos` array:

```javascript
const photos = [
  {
    id: 1,
    src: 'https://your-image-url.jpg',
    alt: 'Description of photo',
  },
  // Add more photos...
]
```

### Adding Events to Calendar

Edit `src/pages/Calendar.jsx` and update the `upcomingEvents` array:

```javascript
const upcomingEvents = [
  {
    id: 1,
    date: '2024-03-15',
    time: '8:00 PM',
    venue: 'Venue Name',
    location: 'City, OR',
    description: 'Event description',
    ticketLink: 'https://...', // optional
  },
  // Add more events...
]
```

### Adding Videos

Edit `src/pages/Media.jsx` to add YouTube video IDs. You can also embed specific videos by updating the `VideoPlayer` component.

### Updating Social Links

Social links are in `src/components/Footer.jsx`. Update the `href` values in the `socialLinks` array.

### Colors

The color scheme is defined in `tailwind.config.js`:

- `band-dark`: #1a1a2e (dark navy)
- `band-accent`: #16213e (accent navy)
- `band-highlight`: #e94560 (red/pink accent)
- `band-light`: #f5f5f5 (light gray background)

## Deployment

This project is ready for deployment on:

- **Netlify**: Connect your repo and deploy
- **Vercel**: Connect your repo and deploy
- **GitHub Pages**: Run `npm run build` and deploy the `dist` folder

### Netlify Form Alternative

If deploying to Netlify, you can use Netlify Forms instead of Formspree:

1. Add `data-netlify="true"` to your form element
2. Add a hidden input: `<input type="hidden" name="form-name" value="contact" />`

## License

Private - 45th Parallel Band
