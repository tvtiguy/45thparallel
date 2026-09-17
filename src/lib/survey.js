// Shared pieces for the band ballot and the fan picks page.

export const DEFAULT_RATING = 3 // "Fine - right time, right place"

// Band scale. `value` is what gets stored; NEVER is handled as a veto in the
// results rather than folded into an average.
// Each option gets its own colour as well as its own glyph, so the five
// positions stay tellable apart at small sizes without reading the emoji.
export const SCALE = [
  {
    value: 5, emoji: '❤️', label: 'Love it', hint: 'gotta keep it',
    idle: 'bg-rose-50 hover:bg-rose-100',
    on: 'bg-rose-500 ring-2 ring-rose-600',
  },
  {
    value: 4, emoji: '👍', label: 'Good', hint: 'happy to play it',
    idle: 'bg-emerald-50 hover:bg-emerald-100',
    on: 'bg-emerald-500 ring-2 ring-emerald-600',
  },
  {
    value: 3, emoji: '😐', label: 'Fine', hint: 'right time, right place',
    idle: 'bg-slate-100 hover:bg-slate-200',
    on: 'bg-slate-400 ring-2 ring-slate-500',
  },
  {
    value: 2, emoji: '👎', label: 'Meh', hint: "I'd rather not",
    idle: 'bg-amber-50 hover:bg-amber-100',
    on: 'bg-amber-500 ring-2 ring-amber-600',
  },
  {
    value: -1, emoji: '🚫', label: 'Never again', hint: '',
    // Outlined so it can't be mistaken for the soft rose of "Love it".
    idle: 'bg-red-100 ring-1 ring-red-300 hover:bg-red-200',
    on: 'bg-red-600 ring-2 ring-red-700',
  },
]

export const scaleFor = (value) => SCALE.find((s) => s.value === value)

// Rotation is measured from songs actually listed in a set (not the "Left out"
// or "Ready if needed" lists carried at the bottom of each sheet), over the
// band's last 8 shows. `song.recent` is how many of those 8 it was played in.
export const RECENT_WINDOW = 8
export const inRotation = (song) => song.recent > 0
export const outOfRotation = (song) => song.recent === 0

export function lastPlayedLabel(song) {
  if (!song.lastPlayed) return 'not in a set since Dec ’24'
  const d = new Date(`${song.lastPlayed}T00:00:00`)
  const month = d.toLocaleDateString('en-US', { month: 'short' })
  return `last played ${month} ’${String(d.getFullYear()).slice(2)}`
}

// True when the serverless API isn't there at all -- i.e. running plain `vite`
// locally. Lets the pages be designed offline without faking away real errors:
// a genuine bad token still comes back as JSON and is reported normally.
let previewMode = false

export const isPreview = () => previewMode

export async function loadBallot(token) {
  let res
  try {
    res = await fetch(`/api/survey?token=${encodeURIComponent(token)}`)
  } catch {
    previewMode = true
    return previewBallot(token)
  }
  const body = await res.text()
  let data
  try {
    data = JSON.parse(body)
  } catch {
    // Not JSON -- the endpoint doesn't exist (dev server served index.html).
    previewMode = true
    return previewBallot(token)
  }
  if (!res.ok) throw new Error(data.error || 'Could not load this link.')
  return data
}

function previewBallot(token) {
  return {
    name: 'Preview',
    type: token.startsWith('fan-') ? 'fan' : 'band',
    ratings: {},
    suggestions: [],
    done: false,
  }
}

export async function saveBallot(token, { ratings, suggestions, done }) {
  if (previewMode) return { ok: true, preview: true }
  const res = await fetch('/api/survey', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, ratings, suggestions, done }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Could not save.')
  return data
}

// Group songs by artist so the list can be rendered with headers, while
// staying a flat alphabetical run.
export function groupByArtist(songs) {
  const out = []
  let current = null
  for (const song of songs) {
    if (!current || current.artist !== song.artist) {
      current = { artist: song.artist, songs: [] }
      out.push(current)
    }
    current.songs.push(song)
  }
  return out
}
