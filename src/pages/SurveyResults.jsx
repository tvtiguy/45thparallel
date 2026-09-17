import { useEffect, useMemo, useState } from 'react'
import songs from '../data/songs.json'
import {
  DEFAULT_RATING,
  scaleFor,
  inRotation,
  outOfRotation,
  lastPlayedLabel,
} from '../lib/survey'

const LIKED = 4.0
const NOT_LIKED = 2.75

const Bar = ({ value }) => {
  const pct = Math.max(0, ((value + 1) / 6) * 100)
  const color = value >= LIKED ? 'bg-green-500' : value <= NOT_LIKED ? 'bg-red-400' : 'bg-gray-400'
  return (
    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

// Each person's own rating is shown alongside the average -- an average can
// hide a lone "Meh" or veto, which is usually the thing worth talking about.
const PerPerson = ({ row }) => (
  <span className="flex gap-1 flex-shrink-0">
    {row.byPerson.map((p) => {
      const s = scaleFor(p.value)
      return (
        <span
          key={p.name}
          title={`${p.name}: ${s ? s.label : p.value}${p.touched ? '' : ' (untouched)'}`}
          className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
            p.touched ? s.idle : 'bg-gray-50 opacity-40'
          }`}
        >
          {s ? s.emoji : '?'}
        </span>
      )
    })}
  </span>
)

const SongRow = ({ row, showPlays = true }) => (
  <div className="flex items-center gap-3 px-4 py-2.5 text-sm">
    <div className="flex-grow min-w-0">
      <span className="font-medium text-band-dark">{row.song.title}</span>
      <span className="text-gray-500"> — {row.song.artist}</span>
      {row.vetoes.length > 0 && (
        <span className="ml-2 text-xs bg-red-100 text-red-700 rounded px-1.5 py-0.5 whitespace-nowrap">
          🚫 {row.vetoes.join(', ')}
        </span>
      )}
      {row.dislikes.length > 0 && (
        <span className="ml-2 text-xs bg-amber-100 text-amber-800 rounded px-1.5 py-0.5 whitespace-nowrap">
          👎 {row.dislikes.join(', ')}
        </span>
      )}
      {showPlays && (
        <span className="block text-xs text-gray-400 mt-0.5">
          in {row.song.recent} of the last 8 shows · {lastPlayedLabel(row.song)}
        </span>
      )}
    </div>
    <PerPerson row={row} />
    <Bar value={row.avg} />
    <span className="w-8 text-right text-gray-600 tabular-nums">{row.avg.toFixed(1)}</span>
  </div>
)

const Section = ({ title, blurb, rows, empty, showPlays }) => (
  <div className="mb-10">
    <h2 className="text-xl font-display text-band-dark mb-1">{title}</h2>
    {blurb && <p className="text-gray-500 text-sm mb-3">{blurb}</p>}
    {rows.length === 0 ? (
      <p className="text-gray-400 text-sm italic">{empty}</p>
    ) : (
      <div className="bg-white rounded-xl shadow-sm divide-y">
        {rows.map((r) => (
          <SongRow key={r.song.id} row={r} showPlays={showPlays} />
        ))}
      </div>
    )}
  </div>
)

const SurveyResults = () => {
  const [password, setPassword] = useState(() => sessionStorage.getItem('adminPw') || '')
  const [unlocked, setUnlocked] = useState(false)
  const [ballots, setBallots] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const fetchResults = async (pw) => {
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/survey?results=1', { headers: { 'x-admin-password': pw } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not load results.')
      sessionStorage.setItem('adminPw', pw)
      setBallots(data)
      setUnlocked(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    const cached = sessionStorage.getItem('adminPw')
    if (cached) fetchResults(cached)
  }, [])

  const analysis = useMemo(() => {
    if (!ballots) return null
    const band = ballots.filter((b) => b.type === 'band')
    const fans = ballots.filter((b) => b.type === 'fan')
    const voters = band.filter((b) => b.started)

    const rows = songs.map((song) => {
      const byPerson = voters.map((b) => ({
        name: b.name,
        value: b.ratings[song.id] ?? DEFAULT_RATING,
        touched: song.id in b.ratings,
      }))
      const values = byPerson.map((p) => p.value)
      const vetoes = byPerson.filter((p) => p.value === -1).map((p) => p.name)
      const dislikes = byPerson.filter((p) => p.touched && p.value === 2).map((p) => p.name)
      const avg = values.length ? values.reduce((a, c) => a + c, 0) / values.length : DEFAULT_RATING
      const spread = values.length ? Math.max(...values) - Math.min(...values) : 0
      const rated = byPerson.filter((p) => p.touched).length
      return { song, byPerson, values, vetoes, dislikes, avg, spread, rated }
    })

    const fanCounts = songs
      .map((song) => ({
        song,
        hearts: fans.filter((f) => f.ratings[song.id]).length,
        who: fans.filter((f) => f.ratings[song.id]).map((f) => f.name),
      }))
      .filter((r) => r.hearts > 0)
      .sort((a, b) => b.hearts - a.hearts)

    return {
      band,
      fans,
      voters,
      rows,
      fanCounts,
      revive: rows
        .filter((r) => r.avg >= LIKED && outOfRotation(r.song))
        .sort((a, b) => b.avg - a.avg),
      // Any active thumbs-down or veto on a song in the current sets is worth a
      // conversation, even when the average still looks respectable.
      retire: rows
        .filter(
          (r) =>
            inRotation(r.song) &&
            (r.avg <= NOT_LIKED || r.vetoes.length > 0 || r.dislikes.length > 0)
        )
        .sort((a, b) => a.avg - b.avg),
      dontTeach: rows
        .filter(
          (r) =>
            outOfRotation(r.song) &&
            !r.byPerson.some((p) => p.touched && p.value >= LIKED) &&
            (r.avg <= NOT_LIKED || r.vetoes.length > 0 || r.dislikes.length > 0)
        )
        .sort((a, b) => a.avg - b.avg),
      divisive: rows.filter((r) => r.spread >= 3).sort((a, b) => b.spread - a.spread || b.avg - a.avg),
      all: [...rows].sort((a, b) => b.avg - a.avg),
      allVetoes: rows.filter((r) => r.vetoes.length > 0).sort((a, b) => a.avg - b.avg),
    }
  }, [ballots])

  if (!unlocked) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-band-light">
        <div className="max-w-sm mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-2xl font-display text-band-dark mb-6 text-center">Survey Results</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                fetchResults(password)
              }}
              className="space-y-4"
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-band-highlight"
                autoFocus
              />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-50">
                {busy ? 'Checking…' : 'Unlock'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const a = analysis

  return (
    <div className="pt-24 pb-24 min-h-screen bg-band-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-display text-band-dark mb-6">Song Check-In Results</h1>

        {/* Who's responded */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-10">
          <h2 className="font-semibold text-band-dark mb-3">Who&rsquo;s weighed in</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {a.band.map((b) => (
              <div key={b.token} className="flex items-center gap-2">
                <span>{b.done ? '✅' : b.started ? '✏️' : '⬜'}</span>
                <span className="text-band-dark">{b.name}</span>
                <span className="text-gray-400 text-xs">
                  {b.done
                    ? 'done'
                    : b.started
                      ? `${Object.keys(b.ratings).length} rated`
                      : 'not started'}
                </span>
              </div>
            ))}
          </div>
          {a.voters.length === 0 && (
            <p className="text-gray-400 text-sm mt-3 italic">
              No ballots yet — everything below will fill in as people respond.
            </p>
          )}
        </div>

        <Section
          title="🔥 Loved, but not in your current sets"
          blurb="Rated highly, but not played in any of your last 8 shows. Cheapest wins — you already know them."
          rows={a.revive}
          empty="Nothing here yet."
        />

        <Section
          title="⚠️ In your current sets, but somebody voted it down"
          blurb="Played in at least one of your last 8 shows, and at least one person gave it a 👎 or a 🚫. A 👎 isn’t a veto — it’s just worth a conversation."
          rows={a.retire}
          empty="Nothing here yet."
        />

        <Section
          title="😬 Most divisive"
          blurb="Wide disagreement between you. Worth actually talking about rather than averaging away."
          rows={a.divisive}
          empty="No big disagreements yet."
        />

        <Section
          title="💤 Out of your sets, and nobody’s pushing for it"
          blurb="Not played in your last 8 shows, nobody rated it Good or better, and someone voted it down. Probably skip these when teaching the new guy."
          rows={a.dontTeach}
          empty="Nothing here yet."
        />

        {a.allVetoes.length > 0 && (
          <Section
            title="🚫 Every veto"
            blurb="Someone said never again. Shown separately so it can't get buried in an average."
            rows={a.allVetoes}
            empty=""
          />
        )}

        {/* Suggestions */}
        <div className="mb-10">
          <h2 className="text-xl font-display text-band-dark mb-1">💡 Songs to work up</h2>
          <p className="text-gray-500 text-sm mb-3">Three picks from each of you.</p>
          <div className="bg-white rounded-xl shadow-sm p-5 space-y-3">
            {a.band.filter((b) => b.suggestions?.some(Boolean)).length === 0 ? (
              <p className="text-gray-400 text-sm italic">No suggestions yet.</p>
            ) : (
              a.band
                .filter((b) => b.suggestions?.some(Boolean))
                .map((b) => (
                  <div key={b.token} className="text-sm">
                    <span className="font-semibold text-band-dark">{b.name}:</span>{' '}
                    <span className="text-gray-700">
                      {b.suggestions.filter(Boolean).join(' · ')}
                    </span>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Fans */}
        <div className="mb-10">
          <h2 className="text-xl font-display text-band-dark mb-1">🎧 What the fans love</h2>
          <p className="text-gray-500 text-sm mb-3">
            Counted separately from the band. {a.fans.filter((f) => f.started).length} of{' '}
            {a.fans.length} have responded.
          </p>
          {a.fanCounts.length === 0 ? (
            <p className="text-gray-400 text-sm italic">No fan picks yet.</p>
          ) : (
            <div className="bg-white rounded-xl shadow-sm divide-y">
              {a.fanCounts.map((r) => (
                <div key={r.song.id} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                  <span className="flex-grow">
                    <span className="font-medium text-band-dark">{r.song.title}</span>
                    <span className="text-gray-500"> — {r.song.artist}</span>
                  </span>
                  <span className="text-xs text-gray-400">{r.who.join(', ')}</span>
                  <span className="whitespace-nowrap">{'❤️'.repeat(r.hearts)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Section
          title="Everything, highest to lowest"
          blurb="The full list. Untouched songs count as “Fine.”"
          rows={a.all}
          empty=""
        />
      </div>
    </div>
  )
}

export default SurveyResults
