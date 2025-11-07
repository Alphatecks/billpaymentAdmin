import './MetricCard.css'

function MetricCard({ title, value, change, changeClass, allTime }) {
  const derivedClass = changeClass ||
    (typeof change === 'string' && change.startsWith('-')
      ? 'metric-change negative'
      : 'metric-change positive')

  return (
    <div className="metric-card">
      <h3 className="metric-title">{title}</h3>
      <div className="metric-value">{value}</div>
      <div className={derivedClass}>{change}</div>
      {allTime != null ? (
        <div className="metric-alltime">All time: {allTime}</div>
      ) : null}
    </div>
  )
}

export default MetricCard

