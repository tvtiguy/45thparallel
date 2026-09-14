import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import songs from '../data/songs.json'
import { loadBallot, saveBallot, groupByArtist } from '../lib/survey'

// Fans get one decision per song -- heart it or skip it. Deliberately no
// progress bar: a completion meter turns a browse into an obligation.
const FanPicks = () => {
  const { token } = useParams()
  const [person, setPerson] = useState(null)
  const [hearts, setHearts] = useState({})
  const [loadError, setLoadError] = useState('')
  const [saveState, setSaveState] = useState('idle')
  const [query, setQuery] = useState('')
  const dirty = useRef(false)

  useEffect(() => {
    loadBallot(token)
      .then((data) => {
        setPerson({ name: data.name, type: data.type })
        setHearts(data.ratings || {})
      })
      .catch((err) => setLoadError(err.message))
  }, [token])

  useEffect(() => {
    if (!person || !dirty.current) return
    setSaveState('saving')
    const t = setTimeout(() => {
      saveBallot(token, { ratings: hearts, suggestions: [], done: false })
        .then(() => setSaveState('saved'))
        .catch(() => setSaveState('error'))
    }, 1200)
    return () => clearTimeout(t)
  }, [hearts, person, token])

  const toggle = (songId) => {
    dirty.current = true
    setHearts((prev) => {
      const next = { ...prev }
      if (next[songId]) delete next[songId]
      else next[songId] = 1
      return next
    })
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return songs
    return songs.filter(
      (s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
    )
  }, [query])

  const groups = useMemo(() => groupByArtist(visible), [visible])
  const count = Object.keys(hearts).length

  if (loadError) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-band-light">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-2xl font-display text-band-dark mb-3">Hmm.</h1>
            <p className="text-gray-600">{loadError}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!person) {
    return <p className="pt-32 text-center text-gray-400">Loading songs&hellip;</p>
  }

  return (
    <div className="pt-20 pb-24 min-h-screen bg-band-light">
      <section className="bg-band-dark text-white py-7">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl font-display mb-2">
            What do you love hearing us play?
          </h1>
          <p className="text-gray-300 text-sm">
            Hi {person.name}! Skim through and tap the heart on any song you love hearing us do.
            Skip anything you don&rsquo;t feel strongly about — no need to get through the whole
            list. Your picks save automatically.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Looking for something in particular? Search here…"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-band-highlight"
        />
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>{count > 0 ? `${count} picked` : 'Tap a heart to pick a song'}</span>
          <span>
            {saveState === 'saving' && 'Saving…'}
            {saveState === 'saved' && 'Saved'}
            {saveState === 'error' && <span className="text-red-500">Couldn&rsquo;t save</span>}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {groups.map((group) => (
            <div key={group.artist}>
              <div className="px-4 py-1.5 bg-gray-50 border-y border-gray-100">
                <span className="text-xs font-semibold text-band-highlight uppercase tracking-wide">
                  {group.artist}
                </span>
              </div>
              {group.songs.map((song) => {
                const picked = Boolean(hearts[song.id])
                return (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => toggle(song.id)}
                    aria-pressed={picked}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span
                      className={`flex-grow min-w-0 text-sm leading-snug ${
                        picked ? 'text-band-dark font-medium' : 'text-gray-600'
                      }`}
                    >
                      {song.title}
                    </span>
                    <span className={`text-lg leading-none ${picked ? '' : 'opacity-25'}`}>
                      {picked ? '❤️' : '🤍'}
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="text-center text-gray-500 py-8">Nothing matches &ldquo;{query}&rdquo;.</p>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-8 text-center">
        <p className="text-gray-500 text-sm">
          That&rsquo;s it — nothing to submit. Thanks for helping us build better setlists. 🎸
        </p>
      </div>
    </div>
  )
}

export default FanPicks
