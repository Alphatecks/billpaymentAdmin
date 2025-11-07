import './MetricCard.css'

function MetricCard({ title, value, change }) {
  return (
    <div className="metric-card">
      <h3 className="metric-title">{title}</h3>
      <div className="metric-value">{value}</div>
      <div className="metric-change positive">{change}</div>
    </div>
  )
}

export default MetricCard

