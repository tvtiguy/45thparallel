// Serverless API for band shows, backed by a single JSON file in Vercel Blob.
//
//   GET    /api/events        -> public list of shows (no auth)
//   POST   /api/events        -> add a show      (requires admin password)
//   DELETE /api/events?id=... -> remove a show   (requires admin password)
//
// The password is checked against the ADMIN_PASSWORD environment variable.
// Blob access uses the auto-injected BLOB_READ_WRITE_TOKEN.

import { put, get, BlobPreconditionFailedError } from '@vercel/blob'

const BLOB_PATH = 'events.json'
const MAX_WRITE_ATTEMPTS = 5

// Reads the show list plus the blob's current ETag, which mutations pass back
// as `ifMatch` so two overlapping saves can't silently overwrite each other.
async function readEvents() {
  // get() returns null when the file doesn't exist yet (no shows added).
  // Any other error propagates so callers never overwrite good data with [].
  const result = await get(BLOB_PATH, { access: 'private' })
  if (!result || !result.stream) return { events: [], etag: null }
  const text = await new Response(result.stream).text()
  const etag = result.blob?.etag ?? null
  try {
    const data = JSON.parse(text)
    return { events: Array.isArray(data) ? data : [], etag }
  } catch {
    return { events: [], etag }
  }
}

// Applies `apply(events)` to the stored list and saves the result.
//
// The save is conditional on the ETag we read, so if another request wrote in
// between, the put fails instead of clobbering it -- we then re-read and replay
// the change against the fresh list. This is what stops two shows saved close
// together from erasing one another.
//
// `apply` returns { events, result } to save, or { error, status } to abort
// without writing.
async function mutateEvents(apply) {
  for (let attempt = 1; attempt <= MAX_WRITE_ATTEMPTS; attempt++) {
    const { events, etag } = await readEvents()
    const outcome = apply(events)
    if (outcome.error) return outcome

    try {
      await put(BLOB_PATH, JSON.stringify(outcome.events), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
        // No ETag means the file doesn't exist yet; nothing to conflict with.
        ...(etag ? { ifMatch: etag } : {}),
      })
      return outcome
    } catch (err) {
      const conflict =
        err instanceof BlobPreconditionFailedError ||
        err?.name === 'BlobPreconditionFailedError'
      if (!conflict) throw err
      if (attempt === MAX_WRITE_ATTEMPTS) {
        // A rejected conditional write saves nothing, so no data was lost --
        // surface a retryable message rather than the raw SDK error.
        const e = new Error('Another change was saved at the same time. Please try again.')
        e.statusCode = 409
        throw e
      }
      // Someone else saved first -- loop to re-read and reapply.
    }
  }
  throw new Error('Could not save the show. Please try again.')
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
    startTime: String(body.startTime || '').trim(),
    endTime: String(body.endTime || '').trim(),
    time: String(body.time || '').trim(), // legacy free-text fallback
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
      const { events } = await readEvents()
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json(events)
    }

    if (req.method === 'POST') {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: 'Incorrect password.', configured: passwordConfigured() })
      }
      const event = cleanEvent(req.body || {})
      if (!event) return res.status(400).json({ error: 'Date and venue are required.' })
      const outcome = await mutateEvents((events) => ({
        events: [...events, event],
        result: event,
      }))
      return res.status(200).json(outcome.result)
    }

    if (req.method === 'PUT') {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: 'Incorrect password.', configured: passwordConfigured() })
      }
      const id = req.body?.id
      if (!id) return res.status(400).json({ error: 'Missing id.' })
      const cleaned = cleanEvent(req.body || {})
      if (!cleaned) return res.status(400).json({ error: 'Date and venue are required.' })
      const outcome = await mutateEvents((events) => {
        const idx = events.findIndex((e) => e.id === id)
        if (idx === -1) return { error: 'Show not found.', status: 404 }
        const updated = { ...cleaned, id } // keep the original id
        const next = [...events]
        next[idx] = updated
        return { events: next, result: updated }
      })
      if (outcome.error) return res.status(outcome.status).json({ error: outcome.error })
      return res.status(200).json(outcome.result)
    }

    if (req.method === 'DELETE') {
      if (!isAuthorized(req)) {
        return res.status(401).json({ error: 'Incorrect password.', configured: passwordConfigured() })
      }
      const id = req.query.id
      if (!id) return res.status(400).json({ error: 'Missing id.' })
      await mutateEvents((events) => ({
        events: events.filter((e) => e.id !== id),
        result: { ok: true },
      }))
      return res.status(200).json({ ok: true })
    }

    res.setHeader('Allow', 'GET, POST, PUT, DELETE')
    return res.status(405).json({ error: 'Method not allowed.' })
  } catch (err) {
    return res.status(err?.statusCode || 500).json({ error: String(err?.message || err) })
  }
}
