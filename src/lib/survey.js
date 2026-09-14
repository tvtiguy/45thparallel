// Shared pieces for the band ballot and the fan picks page.

export const DEFAULT_RATING = 3 // "Fine - right time, right place"

// Band scale. `value` is what gets stored; NEVER is handled as a veto in the
// results rather than folded into an average.
export const SCALE = [
  { value: 5, emoji: '❤️', label: 'Love it', hint: 'gotta keep it' },
  { value: 4, emoji: '👍', label: 'Good', hint: 'happy to play it' },
  { value: 3, emoji: '😐', label: 'Fine', hint: 'right time, right place' },
  { value: 2, emoji: '👎', label: 'Meh', hint: "I'd rather not" },
  { value: -1, emoji: '🚫', label: 'Never again', hint: '' },
]

export const scaleFor = (value) => SCALE.find((s) => s.value === value)

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
