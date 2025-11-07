import './ActivityTable.css'

function ActivityTable({ rows = [], isLoading = false, errorMessage = '' }) {
  const showEmpty = !isLoading && rows.length === 0
  const placeholderMessage = errorMessage || 'No recent activity available.'

  return (
    <div className="activity-table-container">
      <table className="activity-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="table-placeholder">
                Loading recent activity…
              </td>
            </tr>
          ) : showEmpty ? (
            <tr>
              <td colSpan={5} className="table-placeholder">
                {placeholderMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={`${row.id || row.user || index}-${index}`}>
                <td>{row.user || row.customer || '-'}</td>
                <td>{row.type || row.transactionType || '-'}</td>
                <td>{row.amount || '-'}</td>
                <td>
                  <span className="status-badge">{row.status || '-'}</span>
                </td>
                <td>{row.date || row.createdAt || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ActivityTable

