// Shared unlock screen for the password-protected admin pages.
//
// Password managers only offer to save a login when the form looks like one:
// a username field and a password field, each tagged with the right
// `autocomplete` hint. A lone password box gets ignored, which is why Keychain
// never offered to remember this. The username is fixed (there's only one
// login) but has to be a real, visible field for Safari to pick it up.
const USERNAME = '45th Parallel admin'

const PasswordGate = ({ title, password, setPassword, onSubmit, error, busy }) => (
  <div className="pt-28 pb-20 min-h-screen bg-band-light">
    <div className="max-w-sm mx-auto px-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-display text-band-dark mb-6 text-center">{title}</h1>
        <form onSubmit={onSubmit} className="space-y-4" action="#" method="post">
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={USERNAME}
            readOnly
            tabIndex={-1}
            aria-label="Account"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-500
                       text-sm cursor-default focus:outline-none"
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none
                       focus:ring-2 focus:ring-band-highlight"
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

export default PasswordGate
