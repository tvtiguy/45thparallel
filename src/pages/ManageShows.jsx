import { useEffect, useState } from 'react'
import { fetchEvents, upcomingSorted, formatDateParts } from '../lib/events'

const EMPTY_FORM = {
  date: '',
  time: '',
  venue: '',
  city: '',
  address: '',
  fbUrl: '',
}

const ManageShows = () => {
  const [password, setPassword] = useState(() => sessionStorage.getItem('adminPw') || '')
  const [unlocked, setUnlocked] = useState(() => Boolean(sessionStorage.getItem('adminPw')))
  const [events, setEvents] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [unlockError, setUnlockError] = useState('')
  const [unlocking, setUnlocking] = useState(false)

  // Load current shows (GET is public).
  const load = () => fetchEvents().then((data) => setEvents(upcomingSorted(data)))
  useEffect(() => {
    load()
  }, [])

  const unlock = async (e) => {
    e.preventDefault()
    if (!password.trim()) return
    setUnlocking(true)
    setUnlockError('')
    try {
      const res = await fetch('/api/events?check=1', {
        headers: { 'x-admin-password': password },
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(
          data.configured === false
            ? 'The site is missing its ADMIN_PASSWORD setting on the server. (Check Vercel env vars.)'
            : 'Incorrect password.'
        )
      }
      sessionStorage.setItem('adminPw', password)
      setUnlocked(true)
    } catch (err) {
      setUnlockError(err.message)
    } finally {
      setUnlocking(false)
    }
  }

  const lock = () => {
    sessionStorage.removeItem('adminPw')
    setPassword('')
    setUnlocked(false)
  }

  const updateField = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const addShow = async (e) => {
    e.preventDefault()
    setError('')
    setStatus('')
    if (!form.date || !form.venue) {
      setError('Date and venue are required.')
      return
    }
    setBusy(true)
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setForm(EMPTY_FORM)
      setStatus(`Added ${data.venue}.`)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const deleteShow = async (event) => {
    if (!window.confirm(`Delete "${event.venue}" on ${event.date}?`)) return
    setError('')
    setStatus('')
    setBusy(true)
    try {
      const res = await fetch(`/api/events?id=${encodeURIComponent(event.id)}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus(`Deleted ${event.venue}.`)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-band-highlight'

  // Password gate
  if (!unlocked) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-band-light">
        <div className="max-w-sm mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-2xl font-display text-band-dark mb-6 text-center">Manage Shows</h1>
            <form onSubmit={unlock} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={inputClass}
                autoFocus
              />
              {unlockError && <p className="text-red-600 text-sm">{unlockError}</p>}
              <button type="submit" disabled={unlocking} className="btn-primary w-full disabled:opacity-50">
                {unlocking ? 'Checking…' : 'Unlock'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Manager
  return (
    <div className="pt-28 pb-20 min-h-screen bg-band-light">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-display text-band-dark">Manage Shows</h1>
          <button onClick={lock} className="text-sm text-gray-500 hover:text-band-highlight">
            Lock
          </button>
        </div>

        {/* Add form */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="font-semibold text-band-dark mb-4">Add a Show</h2>
          <form onSubmit={addShow} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date *</label>
                <input type="date" value={form.date} onChange={updateField('date')} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Time</label>
                <input
                  type="text"
                  value={form.time}
                  onChange={updateField('time')}
                  placeholder="5:00 – 8:00 PM"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Venue *</label>
              <input
                type="text"
                value={form.venue}
                onChange={updateField('venue')}
                placeholder="Weil Arcade"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={updateField('city')}
                  placeholder="Hillsboro, OR"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Address (optional)</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={updateField('address')}
                  placeholder="233 E Main St, Hillsboro, OR 97123"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Facebook event link (optional)</label>
              <input
                type="url"
                value={form.fbUrl}
                onChange={updateField('fbUrl')}
                placeholder="https://www.facebook.com/events/..."
                className={inputClass}
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {status && <p className="text-green-600 text-sm">{status}</p>}

            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-50">
              {busy ? 'Saving…' : 'Add Show'}
            </button>
          </form>
        </div>

        {/* Current shows */}
        <h2 className="font-semibold text-band-dark mb-4">Upcoming Shows ({events.length})</h2>
        {events.length === 0 ? (
          <p className="text-gray-500">No upcoming shows yet.</p>
        ) : (
          <div className="space-y-3">
            {events.map((event) => {
              const { month, day, year } = formatDateParts(event.date)
              return (
                <div key={event.id} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow">
                  <div className="flex-shrink-0 text-center min-w-[3.5rem]">
                    <div className="text-band-highlight font-display text-sm">{month}</div>
                    <div className="text-2xl font-display text-band-dark leading-none">{day}</div>
                    <div className="text-gray-400 text-xs">{year}</div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-semibold text-band-dark truncate">{event.venue}</p>
                    <p className="text-gray-500 text-sm truncate">
                      {[event.city, event.time].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteShow(event)}
                    disabled={busy}
                    className="flex-shrink-0 text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageShows
