import './Users.css'

const usersData = [
  {
    id: '12345',
    name: 'Emily Carter',
    email: 'emily.carter@email.com',
    phone: '+1234567890',
    registrationDate: '2023-01-15',
    status: 'Active',
  },
  {
    id: '67890',
    name: 'Owen Bennett',
    email: 'owen.bennett@email.com',
    phone: '+1987654321',
    registrationDate: '2023-02-20',
    status: 'Active',
  },
  {
    id: '24680',
    name: 'Chloe Foster',
    email: 'chloe.foster@email.com',
    phone: '+1122334455',
    registrationDate: '2023-03-10',
    status: 'Suspended',
  },
  {
    id: '13579',
    name: 'Noah Davis',
    email: 'noah.davis@email.com',
    phone: '+1555666777',
    registrationDate: '2023-04-05',
    status: 'Active',
  },
  {
    id: '97531',
    name: 'Ava Green',
    email: 'ava.green@email.com',
    phone: '+1888999000',
    registrationDate: '2023-05-12',
    status: 'Active',
  },
  {
    id: '86420',
    name: 'Lucas Hayes',
    email: 'lucas.hayes@email.com',
    phone: '+1444555666',
    registrationDate: '2023-06-18',
    status: 'Suspended',
  },
  {
    id: '36925',
    name: 'Isabella Reed',
    email: 'isabella.reed@email.com',
    phone: '+1777888999',
    registrationDate: '2023-07-22',
    status: 'Active',
  },
  {
    id: '74185',
    name: 'Jackson Simmons',
    email: 'jackson.simmons@email.com',
    phone: '+1333222111',
    registrationDate: '2023-08-30',
    status: 'Suspended',
  },
]

function Users() {
  return (
    <div className="users-page">
      <header className="users-header">
        <div>
          <h1 className="users-title">Customers</h1>
          <p className="users-subtitle">
            Manage user accounts, view details, and update information.
          </p>
        </div>
        <div className="profile-indicator" aria-hidden="true">AB</div>
      </header>

      <div className="users-search">
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
          placeholder="Search by name, email, or phone"
          className="search-input"
        />
      </div>

      <div className="users-filters">
        <button type="button" className="filter-chip">
          Status
          <span className="chevron" aria-hidden="true">▾</span>
        </button>
        <button type="button" className="filter-chip">
          Registration Date
          <span className="chevron" aria-hidden="true">▾</span>
        </button>
      </div>

      <section className="users-table-section">
        <table className="users-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Registration Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id}>
                <td className="link-like">{user.id}</td>
                <td>{user.name}</td>
                <td className="link-like">{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.registrationDate}</td>
                <td>
                  <span
                    className={`status-pill ${
                      user.status === 'Active' ? 'status-active' : 'status-suspended'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <span className="link-like">View Details</span>
                  <span className="divider">|</span>
                  <span className="link-like">Edit</span>
                  <span className="divider">|</span>
                  <span className="link-like">
                    {user.status === 'Active' ? 'Suspend' : 'Activate'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Users
