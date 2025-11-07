import { useMemo, useState } from 'react'
import './Settings.css'

const tabs = ['General', 'Currency', 'Notifications', 'Security', 'User Roles']

const notificationOptions = [
  { id: 'email-transactions', label: 'Transaction Notifications', description: 'Receive an email whenever a transaction is initiated or completed.' },
  { id: 'email-reports', label: 'Weekly Reports', description: 'Get automated performance summaries sent to your inbox every Monday.' },
  { id: 'sms-alerts', label: 'SMS Alerts', description: 'Send SMS alerts for high-value transactions and security events.' },
  { id: 'push-updates', label: 'Push Updates', description: 'Enable push notifications for real-time platform updates.' },
]

const securityOptions = [
  { id: 'two-factor', label: 'Two-Factor Authentication', description: 'Require an additional verification step for every admin login.' },
  { id: 'session-timeout', label: 'Session Timeout', description: 'Automatically log out inactive users to protect against unauthorized access.' },
  { id: 'ip-whitelist', label: 'IP Whitelisting', description: 'Restrict dashboard access to trusted IP addresses only.' },
]

const roleData = [
  { role: 'Admin', description: 'Full access to all modules and system settings.', users: 8, updated: '2024-05-28', status: 'Active' },
  { role: 'Manager', description: 'Manage transactions, users, and reports without system access.', users: 14, updated: '2024-06-12', status: 'Active' },
  { role: 'Support', description: 'View user profiles, respond to tickets, and manage notifications.', users: 6, updated: '2024-06-02', status: 'Restricted' },
]

function Settings() {
  const [activeTab, setActiveTab] = useState('General')
  const [notificationSettings, setNotificationSettings] = useState(() =>
    notificationOptions.reduce((acc, option) => ({ ...acc, [option.id]: true }), {})
  )
  const [securitySettings, setSecuritySettings] = useState({
    'two-factor': true,
    'session-timeout': true,
    'ip-whitelist': false,
  })

  const toggleNotification = (id) => {
    setNotificationSettings((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleSecurity = (id) => {
    setSecuritySettings((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const currencyCards = useMemo(
    () => [
      { title: 'Primary Currency', value: 'Nigerian Naira (NGN)', detail: 'Used for all settlement and reporting values.' },
      { title: 'Conversion Rate Source', value: 'Fixer API', detail: 'Rates refresh every 6 hours to ensure accuracy.' },
      { title: 'Multi-Currency Support', value: 'Enabled', detail: 'Display local currency alongside NGN for international users.' },
    ],
    []
  )

  const renderGeneral = () => (
    <>
      <section className="settings-section">
        <h2 className="section-heading">General Platform Information</h2>
        <div className="settings-grid">
          <div className="form-field full-width">
            <label htmlFor="platform-name">Platform Name</label>
            <input id="platform-name" type="text" placeholder="Enter platform name" />
          </div>
          <div className="form-field full-width">
            <label htmlFor="platform-description">Platform Description</label>
            <textarea
              id="platform-description"
              rows="3"
              placeholder="Describe your platform"
            ></textarea>
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Contact Email</label>
            <input id="contact-email" type="email" placeholder="Enter contact email" />
          </div>
          <div className="form-field">
            <label htmlFor="contact-phone">Contact Phone</label>
            <input id="contact-phone" type="tel" placeholder="Enter phone number" />
          </div>
          <div className="form-field">
            <label htmlFor="support-hours">Support Hours</label>
            <input id="support-hours" type="text" placeholder="e.g. Mon - Fri, 8am - 6pm" />
          </div>
          <div className="form-field">
            <label htmlFor="support-url">Support URL</label>
            <input id="support-url" type="url" placeholder="https://support.example.com" />
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-heading">Branding</h2>
        <div className="branding-grid">
          <div className="upload-card">
            <div className="upload-placeholder">Upload Logo</div>
            <p>Recommended size: 160 × 160px PNG with transparent background.</p>
          </div>
          <div className="form-field">
            <label htmlFor="primary-color">Primary Color</label>
            <input id="primary-color" type="text" placeholder="#2563EB" />
          </div>
          <div className="form-field">
            <label htmlFor="accent-color">Accent Color</label>
            <input id="accent-color" type="text" placeholder="#1F2937" />
          </div>
        </div>
      </section>
    </>
  )

  const renderCurrency = () => (
    <>
      <section className="settings-section">
        <h2 className="section-heading">Currency Settings</h2>
        <div className="settings-grid">
          <div className="form-field">
            <label htmlFor="default-currency">Default Currency</label>
            <select id="default-currency" defaultValue="ngn">
              <option value="ngn">Nigerian Naira (NGN)</option>
              <option value="usd">US Dollar (USD)</option>
              <option value="gbp">British Pound (GBP)</option>
              <option value="eur">Euro (EUR)</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="currency-symbol">Currency Symbol</label>
            <input id="currency-symbol" type="text" placeholder="e.g. ₦" defaultValue="₦" />
          </div>
          <div className="form-field">
            <label htmlFor="exchange-source">Exchange Rate Provider</label>
            <select id="exchange-source" defaultValue="fixer">
              <option value="fixer">Fixer.io</option>
              <option value="currencylayer">Currency Layer</option>
              <option value="openexchangerates">Open Exchange Rates</option>
              <option value="manual">Manual Entry</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="refresh-interval">Refresh Interval</label>
            <select id="refresh-interval" defaultValue="6">
              <option value="1">Every Hour</option>
              <option value="6">Every 6 Hours</option>
              <option value="12">Every 12 Hours</option>
              <option value="24">Every 24 Hours</option>
            </select>
          </div>
          <div className="form-field full-width">
            <label htmlFor="currency-note">Custom Message</label>
            <textarea
              id="currency-note"
              rows="2"
              placeholder="Add any notes that should appear alongside currency conversions"
            ></textarea>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-heading">Currency Overview</h2>
        <div className="currency-overview">
          {currencyCards.map((card) => (
            <div className="currency-card" key={card.title}>
              <span className="currency-card-title">{card.title}</span>
              <span className="currency-card-value">{card.value}</span>
              <p>{card.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )

  const renderNotifications = () => (
    <>
      <section className="settings-section">
        <h2 className="section-heading">Channels</h2>
        <div className="toggle-list">
          {notificationOptions.map((option) => (
            <div className="toggle-item" key={option.id}>
              <div>
                <span className="toggle-label">{option.label}</span>
                <p className="toggle-description">{option.description}</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notificationSettings[option.id]}
                  onChange={() => toggleNotification(option.id)}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-heading">Digest Schedule</h2>
        <div className="settings-grid">
          <div className="form-field">
            <label htmlFor="daily-digest">Daily Summary</label>
            <select id="daily-digest" defaultValue="6am">
              <option value="6am">6:00 AM</option>
              <option value="9am">9:00 AM</option>
              <option value="12pm">12:00 PM</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="weekly-digest">Weekly Digest</label>
            <select id="weekly-digest" defaultValue="monday">
              <option value="monday">Monday</option>
              <option value="wednesday">Wednesday</option>
              <option value="friday">Friday</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="timezone">Primary Timezone</label>
            <select id="timezone" defaultValue="africa-lagos">
              <option value="africa-lagos">Africa/Lagos</option>
              <option value="utc">UTC</option>
              <option value="europe-london">Europe/London</option>
              <option value="america-new_york">America/New_York</option>
            </select>
          </div>
        </div>
      </section>
    </>
  )

  const renderSecurity = () => (
    <>
      <section className="settings-section">
        <h2 className="section-heading">Security Controls</h2>
        <div className="toggle-list">
          {securityOptions.map((option) => (
            <div className="toggle-item" key={option.id}>
              <div>
                <span className="toggle-label">{option.label}</span>
                <p className="toggle-description">{option.description}</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={securitySettings[option.id]}
                  onChange={() => toggleSecurity(option.id)}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-heading">Login Policies</h2>
        <div className="settings-grid">
          <div className="form-field">
            <label htmlFor="password-expiry">Password Expiry</label>
            <select id="password-expiry" defaultValue="90">
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
              <option value="120">120 Days</option>
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="login-attempts">Max Login Attempts</label>
            <select id="login-attempts" defaultValue="5">
              <option value="3">3 Attempts</option>
              <option value="5">5 Attempts</option>
              <option value="8">8 Attempts</option>
            </select>
          </div>
          <div className="form-field full-width">
            <label htmlFor="security-note">Security Notes</label>
            <textarea
              id="security-note"
              rows="2"
              placeholder="Document any custom policies or reminders for the team"
            ></textarea>
          </div>
        </div>
      </section>
    </>
  )

  const renderUserRoles = () => (
    <>
      <section className="settings-section">
        <div className="section-header">
          <h2 className="section-heading">User Roles</h2>
          <button type="button" className="btn btn-primary">Add New Role</button>
        </div>
        <div className="settings-table-wrapper">
          <table className="settings-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Description</th>
                <th>Users</th>
                <th>Last Updated</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roleData.map((role) => (
                <tr key={role.role}>
                  <td>{role.role}</td>
                  <td>{role.description}</td>
                  <td>{role.users}</td>
                  <td>{role.updated}</td>
                  <td>
                    <span className={`badge ${role.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                      {role.status}
                    </span>
                  </td>
                  <td className="table-actions">
                    <span className="link-like">View</span>
                    <span className="divider">|</span>
                    <span className="link-like">Edit</span>
                    <span className="divider">|</span>
                    <span className="link-like">Permissions</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="settings-section">
        <h2 className="section-heading">Role Guidelines</h2>
        <ul className="guidelines-list">
          <li>Every role should have at least one active owner to maintain accountability.</li>
          <li>Review permissions quarterly to ensure they align with evolving team structures.</li>
          <li>Use restrictive defaults and grant additional privileges only when necessary.</li>
        </ul>
      </section>
    </>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'General':
        return renderGeneral()
      case 'Currency':
        return renderCurrency()
      case 'Notifications':
        return renderNotifications()
      case 'Security':
        return renderSecurity()
      case 'User Roles':
        return renderUserRoles()
      default:
        return null
    }
  }

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1 className="settings-title">Settings &amp; Configuration</h1>
        <p className="settings-subtitle">
          Manage system-wide settings, user roles, and permissions.
        </p>
      </header>

      <nav className="settings-tabs" aria-label="Settings sections">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`settings-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {renderContent()}

      <section className="settings-actions">
        <button type="button" className="btn btn-secondary">Cancel</button>
        <button type="button" className="btn btn-primary">Save Changes</button>
      </section>
    </div>
  )
}

export default Settings
