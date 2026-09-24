import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import songs from '../data/songs.json'
import { SCALE, DEFAULT_RATING, loadBallot, saveBallot, groupByArtist } from '../lib/survey'

const RateSongs = () => {
  const { token } = useParams()
  const [person, setPerson] = useState(null)
  const [ratings, setRatings] = useState({})
  const [suggestions, setSuggestions] = useState(['', '', ''])
  const [done, setDone] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [saveState, setSaveState] = useState('idle') // idle | saving | saved | error
  const [query, setQuery] = useState('')
  const dirty = useRef(false)

  useEffect(() => {
    loadBallot(token)
      .then((data) => {
        setPerson({ name: data.name, type: data.type })
        setRatings(data.ratings || {})
        setSuggestions([...(data.suggestions || []), '', '', ''].slice(0, 3))
        setDone(data.done)
      })
      .catch((err) => setLoadError(err.message))
  }, [token])

  // Autosave shortly after the last change, so a long list can't be lost.
  useEffect(() => {
    if (!person || !dirty.current) return
    setSaveState('saving')
    const t = setTimeout(() => {
      saveBallot(token, { ratings, suggestions, done })
        .then(() => setSaveState('saved'))
        .catch(() => setSaveState('error'))
    }, 1200)
    return () => clearTimeout(t)
  }, [ratings, suggestions, done, person, token])

  const setRating = (songId, value) => {
    dirty.current = true
    setRatings((prev) => ({ ...prev, [songId]: value }))
  }

  const updateSuggestion = (i, value) => {
    dirty.current = true
    setSuggestions((prev) => prev.map((s, idx) => (idx === i ? value : s)))
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return songs
    return songs.filter(
      (s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
    )
  }, [query])

  const groups = useMemo(() => groupByArtist(visible), [visible])
  const ratedCount = Object.keys(ratings).length
  const pct = Math.round((ratedCount / songs.length) * 100)

  if (loadError) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-band-light">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-2xl font-display text-band-dark mb-3">Hmm.</h1>
            <p className="text-gray-600">{loadError}</p>
            <p className="text-gray-500 text-sm mt-4">Double-check the link you were sent.</p>
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
      {saveState === 'error' && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-red-600 text-white px-4 py-3 text-sm text-center">
          Your last change didn&rsquo;t save. Check your connection — this page will keep trying as
          you rate. Don&rsquo;t close it until this message clears.
        </div>
      )}
      {/* Header */}
      <section className="bg-band-dark text-white py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl font-display mb-1">Song Check-In</h1>
          <p className="text-gray-300 text-sm">
            Hey {person.name} — rate anything you feel strongly about. Everything starts at
            &ldquo;Fine,&rdquo; so you only need to touch the ones you love or want gone. Your
            answers save automatically.
          </p>
        </div>
      </section>

      {/* Sticky legend + progress */}
      <div className="sticky top-20 z-30 bg-white border-b shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600 mb-2">
            {SCALE.map((s) => (
              <span
                key={s.value}
                className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 whitespace-nowrap ${s.idle}`}
              >
                {s.emoji} {s.label}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-band-highlight transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {ratedCount} of {songs.length}
            </span>
            <span className="text-xs w-14 text-right text-gray-400">
              {saveState === 'saving' && 'Saving…'}
              {saveState === 'saved' && 'Saved'}
              {saveState === 'error' && <span className="text-red-500">Error</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a song or artist…"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-band-highlight"
        />
      </div>

      {/* Song list */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {groups.map((group) => (
            <div key={group.artist}>
              <div className="px-4 py-1.5 bg-gray-50 border-y border-gray-100">
                <span className="text-xs font-semibold text-band-highlight uppercase tracking-wide">
                  {group.artist}
                </span>
              </div>
              {group.songs.map((song) => {
                const current = ratings[song.id] ?? DEFAULT_RATING
                const touched = song.id in ratings
                return (
                  <div key={song.id} className="flex items-center gap-2 px-4 py-2">
                    <span
                      className={`flex-grow min-w-0 text-sm leading-snug ${
                        touched ? 'text-band-dark font-medium' : 'text-gray-600'
                      }`}
                    >
                      {song.title}
                    </span>
                    <div className="flex gap-1 flex-shrink-0">
                      {SCALE.map((s) => {
                        const selected = touched && current === s.value
                        return (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() => setRating(song.id, s.value)}
                            title={`${s.label}${s.hint ? ' — ' + s.hint : ''}`}
                            aria-label={`${song.title}: ${s.label}`}
                            aria-pressed={selected}
                            className={`w-9 h-9 rounded-lg text-base leading-none flex items-center
                                        justify-center transition-all ${selected ? s.on : s.idle}`}
                          >
                            {s.emoji}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        {visible.length === 0 && (
          <p className="text-center text-gray-500 py-8">No songs match &ldquo;{query}&rdquo;.</p>
        )}
      </div>

      {/* Suggestions */}
      {!query && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-semibold text-band-dark mb-1">Three you&rsquo;d like us to work up</h2>
            <p className="text-gray-500 text-sm mb-4">
              Anything — stuff we&rsquo;ve tried in practice, or something totally new. Leave blank
              if nothing comes to mind.
            </p>
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <input
                  key={i}
                  type="text"
                  value={suggestions[i] || ''}
                  onChange={(e) => updateSuggestion(i, e.target.value)}
                  placeholder={`Song ${i + 1}${i === 0 ? ' (e.g. Crazy Little Thing Called Love)' : ''}`}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-band-highlight"
                />
              ))}
            </div>
          </div>

          {/* Done */}
          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => {
                dirty.current = true
                setDone(!done)
              }}
              className={done ? 'btn-secondary' : 'btn-primary'}
            >
              {done ? "Mark as not finished" : "I'm done"}
            </button>
            <p className="text-gray-500 text-sm mt-3">
              {done
                ? 'Marked done — you can still change anything until we tally it up.'
                : 'You can close this and come back any time; nothing is lost.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RateSongs
