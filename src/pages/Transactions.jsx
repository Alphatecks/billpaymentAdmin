import { useState } from 'react'
import './Transactions.css'

const defaultFilters = {
  type: '',
  status: '',
  user: '',
  startDate: '',
  endDate: '',
}

const transactions = [
  {
    id: 'TXN123456',
    user: 'user123',
    type: 'Bill Payment',
    amount: '₦50,000',
    status: 'Completed',
    datetime: '2024-01-15 10:00 AM',
  },
  {
    id: 'TXN789012',
    user: 'user456',
    type: 'Airtime Purchase',
    amount: '₦20,000',
    status: 'Pending',
    datetime: '2024-01-16 02:30 PM',
  },
  {
    id: 'TXN345678',
    user: 'user789',
    type: 'Data Purchase',
    amount: '₦10,000',
    status: 'Completed',
    datetime: '2024-01-17 09:15 AM',
  },
  {
    id: 'TXN901234',
    user: 'user123',
    type: 'Deposit',
    amount: '₦100,000',
    status: 'Completed',
    datetime: '2024-01-18 11:45 AM',
  },
  {
    id: 'TXN567890',
    user: 'user456',
    type: 'Bill Payment',
    amount: '₦75,000',
    status: 'Failed',
    datetime: '2024-01-19 03:20 PM',
  },
  {
    id: 'TXN234567',
    user: 'user789',
    type: 'Airtime Purchase',
    amount: '₦15,000',
    status: 'Completed',
    datetime: '2024-01-20 08:00 AM',
  },
  {
    id: 'TXN890123',
    user: 'user123',
    type: 'Data Purchase',
    amount: '₦5,000',
    status: 'Completed',
    datetime: '2024-01-21 01:10 PM',
  },
]

function Transactions() {
  const [filters, setFilters] = useState(defaultFilters)

  const handleFilterChange = (field) => (event) => {
    setFilters((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleReset = () => setFilters(defaultFilters)

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <h1 className="transactions-title">Transactions</h1>
      </div>

      <div className="transactions-search">
        <span className="search-icon" aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15Z"
              stroke="#6b7280"
              strokeWidth="2"
            />
            <path
              d="M16.5 16.5L13.75 13.75"
              stroke="#6b7280"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search transactions"
          className="search-input"
        />
      </div>

      <section className="filters-section">
        <h2 className="section-heading">Filters</h2>
        <div className="filters-grid">
          <div className="form-field">
            <label>Transaction Type</label>
            <select value={filters.type} onChange={handleFilterChange('type')}>
              <option value="">Select type</option>
              <option value="bill">Bill Payment</option>
              <option value="airtime">Airtime Purchase</option>
              <option value="data">Data Purchase</option>
              <option value="deposit">Deposit</option>
            </select>
          </div>
          <div className="form-field">
            <label>Status</label>
            <select value={filters.status} onChange={handleFilterChange('status')}>
              <option value="">Select status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="form-field">
            <label>User</label>
            <select value={filters.user} onChange={handleFilterChange('user')}>
              <option value="">Select user</option>
              <option value="user123">user123</option>
              <option value="user456">user456</option>
              <option value="user789">user789</option>
            </select>
          </div>
          <div className="form-field">
            <label>Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={handleFilterChange('startDate')}
            />
          </div>
          <div className="form-field">
            <label>End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={handleFilterChange('endDate')}
            />
          </div>
        </div>
        <div className="filters-actions">
          <button type="button" className="btn btn-primary">Apply Filters</button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
        </div>
      </section>

      <section className="transactions-list-section">
        <h2 className="section-heading">Transaction List</h2>
        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date/Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td className="link-like">{transaction.user}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.amount}</td>
                  <td>
                    <span className={`status-pill status-${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td>{transaction.datetime}</td>
                  <td className="link-like">View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Transactions
