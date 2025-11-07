import MetricCard from '../components/MetricCard'
import Button from '../components/Button'
import ActivityTable from '../components/ActivityTable'
import './Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Overview of key metrics and recent activity</p>
      </div>

      <div className="metrics-section">
        <MetricCard title="Total Transactions" value="12,345" change="+12%" />
        <MetricCard title="Revenue" value="₦56,789" change="+8%" />
        <MetricCard title="Active Users" value="3,456" change="+5%" />
        <MetricCard title="New Users" value="789" change="+10%" />
      </div>

      <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-buttons">
          <Button variant="primary">New Transaction</Button>
          <Button variant="secondary">View All Transactions</Button>
        </div>
      </div>

      <div className="recent-activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <ActivityTable />
      </div>
    </div>
  )
}

export default Dashboard

