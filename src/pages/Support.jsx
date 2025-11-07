import './Support.css'

const ticketData = [
  {
    id: '#12345',
    user: 'emma.jones@email.com',
    subject: 'Payment failed',
    status: 'Open',
    updatedAt: '2024-07-26 10:00 AM',
  },
  {
    id: '#12346',
    user: 'liam.smith@email.com',
    subject: 'Airtime not received',
    status: 'In Progress',
    updatedAt: '2024-07-25 04:30 PM',
  },
  {
    id: '#12347',
    user: 'olivia.brown@email.com',
    subject: 'Data purchase issue',
    status: 'Closed',
    updatedAt: '2024-07-24 09:15 AM',
  },
  {
    id: '#12348',
    user: 'noah.davis@email.com',
    subject: 'Naira deposit not reflecting',
    status: 'Open',
    updatedAt: '2024-07-23 02:00 PM',
  },
  {
    id: '#12349',
    user: 'isabella.wilson@email.com',
    subject: 'Account verification',
    status: 'In Progress',
    updatedAt: '2024-07-22 11:45 AM',
  },
  {
    id: '#12350',
    user: 'ethan.garcia@email.com',
    subject: 'Transaction history',
    status: 'Closed',
    updatedAt: '2024-07-21 03:20 PM',
  },
  {
    id: '#12351',
    user: 'sophia.rodriguez@email.com',
    subject: 'Password reset',
    status: 'Open',
    updatedAt: '2024-07-20 08:50 AM',
  },
  {
    id: '#12352',
    user: 'jackson.lopez@email.com',
    subject: 'App performance',
    status: 'In Progress',
    updatedAt: '2024-07-19 01:10 PM',
  },
  {
    id: '#12353',
    user: 'ava.hernandez@email.com',
    subject: 'Contact support',
    status: 'Closed',
    updatedAt: '2024-07-18 06:40 AM',
  },
  {
    id: '#12354',
    user: 'aiden.martinez@email.com',
    subject: 'Feedback',
    status: 'Open',
    updatedAt: '2024-07-17 12:25 PM',
  },
]

function Support() {
  return (
    <div className="support-page">
      <header className="support-header">
        <h1 className="support-title">Support Tickets</h1>
        <p className="support-subtitle">Manage and respond to user support inquiries.</p>
      </header>

      <div className="support-search">
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
          placeholder="Search tickets by ID, user, or subject"
          className="search-input"
        />
      </div>

      <div className="support-filters">
        <button type="button" className="filter-chip">
          Status
          <span className="chevron" aria-hidden="true">▾</span>
        </button>
        <button type="button" className="filter-chip">
          Assigned To
          <span className="chevron" aria-hidden="true">▾</span>
        </button>
        <button type="button" className="filter-chip">
          Date
          <span className="chevron" aria-hidden="true">▾</span>
        </button>
      </div>

      <section className="support-table-section">
        <table className="support-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>User</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {ticketData.map((ticket) => (
              <tr key={ticket.id}>
                <td className="link-like">{ticket.id}</td>
                <td className="link-like">{ticket.user}</td>
                <td>{ticket.subject}</td>
                <td>
                  <span className={`status-pill status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                    {ticket.status}
                  </span>
                </td>
                <td>{ticket.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Support


