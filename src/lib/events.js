// Shared helpers for loading/formatting shows.
//
// Events are stored in the cloud (Vercel Blob) and served by the /api/events
// serverless function. When that endpoint isn't available -- e.g. running the
// plain Vite dev server (`npm run dev`) without the function -- we fall back to
// the sample shows below so the page still renders while we design it.

const SAMPLE_EVENTS = [
  {
    id: 'weil-2026-07-21',
    date: '2026-07-21',
    time: '5:00 – 8:00 PM',
    venue: 'Weil Arcade',
    city: 'Hillsboro, OR',
    address: '233 E Main St, Hillsboro, OR 97123',
    fbUrl: 'https://www.facebook.com/events/1325683682879547/',
  },
]

// Fetch every show from the API, falling back to sample data locally.
export async function fetchEvents() {
  try {
    const res = await fetch('/api/events')
    if (!res.ok) throw new Error('events api unavailable')
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return SAMPLE_EVENTS
  }
}

// Today's date as YYYY-MM-DD in local time (comparable to event.date).
export function todayStr() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Upcoming shows (today or later), soonest first.
export function upcomingSorted(events) {
  const today = todayStr()
  return [...events]
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
}

// Google Maps directions link for a street address.
export function mapsUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

// Every half-hour slot as a 12-hour label, e.g. "5:00 PM". Used by the
// start/end time dropdowns on the admin page.
export function timeOptions() {
  const out = []
  for (let h = 0; h < 24; h++) {
    for (const m of [0, 30]) {
      const period = h < 12 ? 'AM' : 'PM'
      const hour12 = h % 12 === 0 ? 12 : h % 12
      out.push(`${hour12}:${String(m).padStart(2, '0')} ${period}`)
    }
  }
  return out
}

// The time a show should display, from start/end dropdowns, with a fallback
// to the older free-text `time` field for shows saved before dropdowns.
export function displayTime(event) {
  if (event.startTime && event.endTime) return `${event.startTime} – ${event.endTime}`
  if (event.startTime) return event.startTime
  return event.time || ''
}

// Parse a YYYY-MM-DD string as a local date (avoids UTC off-by-one).
function localDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`)
}

// { weekday, month, day, year } pieces for a show's date block.
export function formatDateParts(dateStr) {
  const d = localDate(dateStr)
  return {
    weekday: d.toLocaleDateString('en-US', { weekday: 'long' }),
    month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: d.getDate(),
    year: d.getFullYear(),
  }
}
