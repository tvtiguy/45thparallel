import { useEffect, useMemo, useState } from 'react'
import songs from '../data/songs.json'
import { outOfRotation, lastPlayedLabel } from '../lib/survey'

// Fan picks on their own page, separate from the band's ballot. Same password
// as the main results page.

const FanResults = () => {
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

  const data = useMemo(() => {
    if (!ballots) return null
    const fans = ballots.filter((b) => b.type === 'fan')
    const responded = fans.filter((f) => Object.keys(f.ratings).length > 0)

    const ranked = songs
      .map((song) => ({
        song,
        who: responded.filter((f) => f.ratings[song.id]).map((f) => f.name),
      }))
      .map((r) => ({ ...r, hearts: r.who.length }))
      .filter((r) => r.hearts > 0)
      .sort((a, b) => b.hearts - a.hearts || a.song.title.localeCompare(b.song.title))

    return {
      fans,
      responded,
      ranked,
      // Fans love it, but it's fallen out of your rotation.
      hidden: ranked.filter((r) => outOfRotation(r.song)),
    }
  }, [ballots])

  if (!unlocked) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-band-light">
        <div className="max-w-sm mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-2xl font-display text-band-dark mb-6 text-center">Parallelafan Picks</h1>
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

  const Row = ({ r }) => (
    <div className="flex items-center gap-3 px-4 py-2.5 text-sm">
      <span className="w-7 text-right text-gray-400 tabular-nums flex-shrink-0">{r.hearts}</span>
      <span className="flex-grow min-w-0">
        <span className="font-medium text-band-dark">{r.song.title}</span>
        <span className="text-gray-500"> — {r.song.artist}</span>
      </span>
      <span className="text-xs text-gray-400 hidden sm:inline whitespace-nowrap">
        {r.who.join(', ')}
      </span>
      <span className="text-xs text-gray-400 whitespace-nowrap">{lastPlayedLabel(r.song)}</span>
    </div>
  )

  return (
    <div className="pt-24 pb-24 min-h-screen bg-band-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-display text-band-dark mb-1">Parallelafan Picks</h1>
        <p className="text-gray-500 text-sm mb-6">
          Counted entirely separately from the band&rsquo;s ballot. The last column is when you last
          played it in a set.
        </p>

        <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
          <h2 className="font-semibold text-band-dark mb-3">
            Who&rsquo;s responded ({data.responded.length} of {data.fans.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {data.fans.map((f) => {
              const n = Object.keys(f.ratings).length
              return (
                <div key={f.token} className="flex items-center gap-2">
                  <span>{n > 0 ? '✅' : '⬜'}</span>
                  <span className="text-band-dark">{f.name}</span>
                  <span className="text-gray-400 text-xs">
                    {n > 0 ? `${n} picked` : 'nothing yet'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {data.hidden.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-display text-band-dark mb-1">
              🎯 They love it, but it’s not in your current sets
            </h2>
            <p className="text-gray-500 text-sm mb-3">
              Fan favorites you haven’t played in any of your last 8 shows.
            </p>
            <div className="bg-white rounded-xl shadow-sm divide-y">
              {data.hidden.map((r) => (
                <Row key={r.song.id} r={r} />
              ))}
            </div>
          </div>
        )}

        <h2 className="text-xl font-display text-band-dark mb-1">Every Parallelafan pick</h2>
        <p className="text-gray-500 text-sm mb-3">Most-loved first.</p>
        {data.ranked.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No Parallelafan picks yet.</p>
        ) : (
          <div className="bg-white rounded-xl shadow-sm divide-y">
            {data.ranked.map((r) => (
              <Row key={r.song.id} r={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FanResults
