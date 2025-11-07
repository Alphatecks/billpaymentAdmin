import Button from '../components/Button'
import './Login.css'

function Login({ onLogin }) {
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

          <form className="login-form" onSubmit={(event) => event.preventDefault()}>
            <label className="form-field">
              <span>Email address</span>
              <input type="email" defaultValue="demo@billpay.com" placeholder="Enter email" />
            </label>
            <label className="form-field">
              <span>Password</span>
              <input type="password" placeholder="Enter password" />
            </label>

            <Button type="submit" variant="dark" onClick={onLogin} className="full-width">
              Login Now
            </Button>
          </form>

          <div className="panel-footer" />
        </div>
      </div>
    </div>
  )
}

export default Login
