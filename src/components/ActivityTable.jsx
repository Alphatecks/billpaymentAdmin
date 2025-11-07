import './ActivityTable.css'

const tableData = [
  { user: 'Sophia Clark', type: 'Bill Payment', amount: '₦100', status: 'Completed', date: '2024-07-26' },
  { user: 'Ethan Carter', type: 'Airtime Purchase', amount: '₦20', status: 'Completed', date: '2024-07-26' },
  { user: 'Olivia Bennett', type: 'Data Purchase', amount: '₦50', status: 'Pending', date: '2024-07-25' },
  { user: 'Liam Foster', type: 'Naira Deposit', amount: '₦200', status: 'Completed', date: '2024-07-25' },
  { user: 'Ava Hughes', type: 'Bill Payment', amount: '₦75', status: 'Completed', date: '2024-07-24' },
]

function ActivityTable() {
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
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.user}</td>
              <td>{row.type}</td>
              <td>{row.amount}</td>
              <td>
                <span className="status-badge">{row.status}</span>
              </td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ActivityTable

