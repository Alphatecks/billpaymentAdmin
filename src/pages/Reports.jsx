import Button from '../components/Button'
import './Reports.css'

function Reports() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  const activeUserBars = [55, 70, 78, 80, 72, 60, 68]
  const serviceRevenue = [
    { label: 'Service A', value: 70 },
    { label: 'Service B', value: 40 },
    { label: 'Service C', value: 20 },
  ]
  const serviceVolume = [
    { label: 'Service A', value: 85 },
    { label: 'Service B', value: 60 },
    { label: 'Service C', value: 25 },
  ]

  return (
    <div className="reports-page">
      <header className="reports-header">
        <h1 className="reports-title">Reports &amp; Analytics</h1>
      </header>

      <section className="reports-filters">
        <h2 className="section-heading">Filters</h2>
        <div className="filters-grid">
          <select defaultValue="">
            <option value="" disabled hidden>
              Select report type
            </option>
            <option value="transactions">Transactions</option>
            <option value="revenue">Revenue</option>
            <option value="users">Users</option>
          </select>
          <select defaultValue="">
            <option value="" disabled hidden>
              Select time range
            </option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <input type="text" placeholder="Enter keyword" />
        </div>
        <div className="filter-buttons">
          <Button variant="secondary">Export</Button>
          <Button variant="primary">Apply Filters</Button>
        </div>
      </section>

      <section className="reports-overview">
        <h2 className="section-heading">Transaction Overview</h2>
        <div className="overview-grid">
          <div className="overview-card">
            <div className="card-header">
              <span className="card-title">Transaction Volume</span>
              <span className="card-subtitle">Last 30 Days</span>
            </div>
            <div className="card-value">12,345</div>
            <div className="bar-chart">
              {months.map((month, index) => (
                <div className="bar" key={month}>
                  <div className="bar-fill" style={{ height: `${40 + index * 8}%` }}></div>
                  <span className="bar-label">{month}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="overview-card">
            <div className="card-header">
              <span className="card-title">Revenue Trends</span>
              <span className="card-subtitle">Last 30 Days</span>
            </div>
            <div className="card-value">₦56,789</div>
            <div className="line-chart">
              <svg viewBox="0 0 300 120" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  points="0,90 40,60 80,80 120,40 160,75 200,55 240,95 280,65 300,90"
                />
              </svg>
              <div className="chart-labels">
                {months.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="overview-card full-width">
            <div className="card-header">
              <span className="card-title">Transaction Type Distribution</span>
              <span className="card-subtitle">Current Month</span>
            </div>
            <div className="card-value">100%</div>
            <div className="distribution-list">
              {[
                { label: 'Type A', value: 60 },
                { label: 'Type B', value: 25 },
                { label: 'Type C', value: 15 },
              ].map((item) => (
                <div className="distribution-item" key={item.label}>
                  <span className="distribution-label">{item.label}</span>
                  <div className="distribution-bar">
                    <div style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="reports-section">
        <h2 className="section-heading">User Activity</h2>
        <div className="overview-grid two-column">
          <div className="overview-card">
            <div className="card-header">
              <span className="card-title">New Users</span>
              <span className="card-subtitle">Last 30 Days</span>
            </div>
            <div className="card-value">500</div>
            <div className="line-chart">
              <svg viewBox="0 0 300 120" preserveAspectRatio="none">
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  points="0,80 40,65 80,75 120,55 160,90 200,60 240,95 280,70 300,85"
                />
              </svg>
              <div className="chart-labels">
                {months.map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="overview-card">
            <div className="card-header">
              <span className="card-title">Active Users</span>
              <span className="card-subtitle">Last 30 Days</span>
            </div>
            <div className="card-value">1,200</div>
            <div className="bar-chart">
              {months.map((month, index) => (
                <div className="bar" key={month}>
                  <div className="bar-fill" style={{ height: `${activeUserBars[index]}%` }}></div>
                  <span className="bar-label">{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="reports-section">
        <h2 className="section-heading">Service Performance</h2>
        <div className="overview-grid two-column">
          <div className="overview-card">
            <div className="card-header">
              <span className="card-title">Top Services by Revenue</span>
              <span className="card-subtitle">Last 30 Days</span>
            </div>
            <div className="card-value">₦20,000</div>
            <div className="performance-list">
              {serviceRevenue.map((item) => (
                <div className="performance-item" key={item.label}>
                  <span className="performance-label">{item.label}</span>
                  <div className="performance-bar">
                    <div style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overview-card">
            <div className="card-header">
              <span className="card-title">Top Services by Volume</span>
              <span className="card-subtitle">Last 30 Days</span>
            </div>
            <div className="card-value">5,000</div>
            <div className="performance-list">
              {serviceVolume.map((item) => (
                <div className="performance-item" key={item.label}>
                  <span className="performance-label">{item.label}</span>
                  <div className="performance-bar">
                    <div style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reports
