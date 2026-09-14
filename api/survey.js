// Serverless API for the song survey, backed by Vercel Blob.
//
//   GET  /api/survey?token=XXX   -> that person's saved ballot (for resume)
//   POST /api/survey             -> save a ballot  { token, ratings, suggestions, done }
//   GET  /api/survey?results=1   -> every ballot   (requires admin password)
//
// Each person's answers live in their own blob (survey/<token>.json), so two
// people filling this out at the same time can never overwrite each other.
//
// The roster lives here on the server rather than in the page bundle, so the
// links aren't discoverable by reading the site's source.

import { put, get } from '@vercel/blob'

const ROSTER = {
  // Band — five-point scale, vetoes, and three suggestions
  'mw-4k7p2x': { name: 'Mark Watson', type: 'band' },
  'rb-9t3fq8': { name: 'Rich Boam', type: 'band' },
  'jw-6h2vn5': { name: 'John Wesson', type: 'band' },
  'mm-8c5rz1': { name: 'Mark Moulding', type: 'band' },

  // Fans — hearts only
  'fan-g7m2kd': { name: 'Ginny', type: 'fan' },
  'fan-l4p9wb': { name: 'Lindsay', type: 'fan' },
}

const blobPath = (token) => `survey/${token}.json`

function isAuthorized(req) {
  const provided = String(req.headers['x-admin-password'] || '').trim()
  const expected = String(process.env.ADMIN_PASSWORD || '').trim()
  return expected.length > 0 && provided === expected
}

async function readBallot(token) {
  const result = await get(blobPath(token), { access: 'private' })
  if (!result || !result.stream) return null
  const text = await new Response(result.stream).text()
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

async function writeBallot(token, ballot) {
  await put(blobPath(token), JSON.stringify(ballot), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
}

// Keep only what we expect: ratings are songId -> number, suggestions are
// up to three short strings.
function cleanBallot(body) {
  const ratings = {}
  const raw = body.ratings && typeof body.ratings === 'object' ? body.ratings : {}
  for (const [id, value] of Object.entries(raw)) {
    const n = Number(value)
    if (Number.isFinite(n) && n >= -1 && n <= 5) ratings[String(id).slice(0, 100)] = n
  }
  const suggestions = (Array.isArray(body.suggestions) ? body.suggestions : [])
    .slice(0, 3)
    .map((s) => String(s || '').trim().slice(0, 120))
  return { ratings, suggestions, done: Boolean(body.done) }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Admin: every ballot at once.
      if (req.query.results !== undefined) {
        if (!isAuthorized(req)) {
          return res.status(401).json({ error: 'Incorrect password.' })
        }
        const all = []
        for (const [token, person] of Object.entries(ROSTER)) {
          const ballot = await readBallot(token)
          all.push({
            token,
            name: person.name,
            type: person.type,
            started: Boolean(ballot),
            ...(ballot || { ratings: {}, suggestions: [], done: false }),
          })
        }
        res.setHeader('Cache-Control', 'no-store')
        return res.status(200).json(all)
      }

      const token = String(req.query.token || '')
      const person = ROSTER[token]
      if (!person) return res.status(404).json({ error: 'Unknown link.' })
      const ballot = await readBallot(token)
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json({
        name: person.name,
        type: person.type,
        ratings: ballot?.ratings || {},
        suggestions: ballot?.suggestions || [],
        done: ballot?.done || false,
      })
    }

    if (req.method === 'POST') {
      const token = String(req.body?.token || '')
      const person = ROSTER[token]
      if (!person) return res.status(404).json({ error: 'Unknown link.' })
      const ballot = { ...cleanBallot(req.body || {}), savedAt: new Date().toISOString() }
      await writeBallot(token, ballot)
      return res.status(200).json({ ok: true, savedAt: ballot.savedAt })
    }

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  } catch (err) {
    return res.status(err?.statusCode || 500).json({ error: String(err?.message || err) })
  }
}
