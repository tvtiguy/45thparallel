// Serverless API for band shows, backed by a single JSON file in Vercel Blob.
//
//   GET    /api/events        -> public list of shows (no auth)
//   POST   /api/events        -> add a show      (requires admin password)
//   DELETE /api/events?id=... -> remove a show   (requires admin password)
//
// The password is checked against the ADMIN_PASSWORD environment variable.
// Blob access uses the auto-injected BLOB_READ_WRITE_TOKEN.

import { put, list } from '@vercel/blob'

const BLOB_PATH = 'events.json'

async function readEvents() {
  const { blobs } = await list({ prefix: BLOB_PATH })
  const match = blobs.find((b) => b.pathname === BLOB_PATH)
  if (!match) return []
  const res = await fetch(match.url, { cache: 'no-store' })
  if (!res.ok) return []
  try {
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

async function writeEvents(events) {
  await put(BLOB_PATH, JSON.stringify(events), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
}

function isAuthorized(req) {
  const provided = String(req.headers['x-admin-password'] || '').trim()
  const expected = String(process.env.ADMIN_PASSWORD || '').trim()
  return expected.length > 0 && provided === expected
}

// Reported (as a boolean only, never the value) so we can tell a missing
// env var apart from a wrong password when debugging.
function passwordConfigured() {
  return Boolean(String(process.env.ADMIN_PASSWORD || '').trim())
}

function cleanEvent(body) {
  const date = String(body.date || '').trim()
  const venue = String(body.venue || '').trim()
  if (!date || !venue) return null
  return {
    id: globalThis.crypto?.randomUUID?.() || String(Date.now()),
    date, // YYYY-MM-DD
    time: String(body.time || '').trim(),
    venue,
    city: String(body.city || '').trim(),
    address: String(body.address || '').trim(),
    fbUrl: String(body.fbUrl || '').trim(),
  }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Password validation probe used by the admin unlock screen.
      if (req.query.check !== undefined) {
        if (!isAuthorized(req)) {
          return res.status(401).json({ ok: false, configured: passwordConfigured() })
        }
        return res.status(200).json({ ok: true })
      }
      const events = await readEvents()
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json(events)
    }

    if (req.method === 'POST') {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: 'Incorrect password.', configured: passwordConfigured() })
      }
      const event = cleanEvent(req.body || {})
      if (!event) return res.status(400).json({ error: 'Date and venue are required.' })
      const events = await readEvents()
      events.push(event)
      await writeEvents(events)
      return res.status(200).json(event)
    }

    if (req.method === 'DELETE') {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: 'Incorrect password.', configured: passwordConfigured() })
      }
      const id = req.query.id
      if (!id) return res.status(400).json({ error: 'Missing id.' })
      const events = await readEvents()
      await writeEvents(events.filter((e) => e.id !== id))
      return res.status(200).json({ ok: true })
    }

    res.setHeader('Allow', 'GET, POST, DELETE')
    return res.status(405).json({ error: 'Method not allowed.' })
  } catch (err) {
    return res.status(500).json({ error: String(err?.message || err) })
  }
}
