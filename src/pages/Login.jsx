import { useState } from 'react'
import Button from '../components/Button'
import './Login.css'
import { adminLogin } from '../services/auth'

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: 'admin@example.com',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field) => (event) => {
    setCredentials((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!credentials.email || !credentials.password) {
      setError('Email and password are required.')
      return
    }

    try {
      setIsLoading(true)
      const authResponse = await adminLogin(credentials)
      onLogin?.(authResponse)
    } catch (loginError) {
      setError(loginError.message || 'Unable to login. Please verify your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="hero-logo">NB</div>
        <div className="hero-content">
          <h1 className="hero-title">
            Hello
            <br />
            Niel Bill Payment!
            <span role="img" aria-label="waving hand">👋</span>
          </h1>
          <p className="hero-text">
            Skip repetitive and manual bill management tasks. Get highly productive through
            automation and save tons of time!
          </p>
        </div>
        <p className="hero-footer">© 2025 Niel Bill Payment. All rights reserved.</p>
      </div>

      <div className="login-panel">
        <div className="panel-inner">
          <h2 className="panel-logo">Niel Bill Payment</h2>
          <div className="panel-header">
            <h3>Welcome Back Admin!</h3>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>Email address</span>
              <input
                type="email"
                value={credentials.email}
                onChange={handleChange('email')}
                placeholder="Enter email"
                autoComplete="username"
                required
              />
            </label>
            <label className="form-field">
              <span>Password</span>
              <input
                type="password"
                value={credentials.password}
                onChange={handleChange('password')}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </label>

            {error ? <p className="form-error" role="alert">{error}</p> : null}

            <Button
              type="submit"
              variant="dark"
              className="full-width"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in…' : 'Login Now'}
            </Button>
          </form>

          <div className="panel-footer" />
        </div>
      </div>
    </div>
  )
}

export default Login
