import { useMemo, useState, useEffect } from 'react'
import './Users.css'
import { fetchCustomers, fetchCustomerById } from '../services/customers'

function formatDate(value) {
  if (!value) return '-'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsed)
}

function Users({ auth }) {
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalCustomer, setModalCustomer] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalError, setModalError] = useState('')

  const sessionToken = useMemo(
    () => auth?.token || auth?.session_token || auth?.access_token,
    [auth],
  )

  useEffect(() => {
    if (!sessionToken) return

    let isMounted = true
    const loadCustomers = async () => {
      try {
        setLoading(true)
        const response = await fetchCustomers(sessionToken)
        if (!isMounted) return

        const items = response?.items ?? response?.data ?? response ?? []
        const normalized = items.map((item) => ({
          id: item.id ?? item.customerId ?? item.reference ?? 'N/A',
          name: item.name || `${item.firstName ?? ''} ${item.lastName ?? ''}`.trim() || '-',
          email: item.email || '-',
          phone: item.phone || item.phoneNumber || '-',
          registrationDate: formatDate(item.createdAt || item.registrationDate),
          status: item.status || item.state || 'Active',
        }))

        setCustomers(normalized)
        setFilteredCustomers(normalized)
        setError('')
      } catch (loadError) {
        if (isMounted) {
          setCustomers([])
          setFilteredCustomers([])
          setError(loadError.message || 'Unable to load customers.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadCustomers()
    return () => {
      isMounted = false
    }
  }, [sessionToken])

  useEffect(() => {
    const normalizedSearch = searchValue.trim().toLowerCase()
    const next = customers.filter((customer) => {
      const matchSearch = normalizedSearch
        ? [customer.name, customer.email, customer.phone]
            .join(' ')?.toLowerCase()
            .includes(normalizedSearch)
        : true
      const matchStatus = statusFilter ? String(customer.status).toLowerCase() === statusFilter : true
      return matchSearch && matchStatus
    })
    setFilteredCustomers(next)
  }, [customers, searchValue, statusFilter])

  const handleStatusFilter = (value) => {
    setStatusFilter(value)
  }

  const openModal = (customer) => {
    setModalCustomer(customer)
    setModalError('')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalCustomer(null)
    setModalError('')
  }

  const handleViewDetails = async (customerId) => {
    try {
      setModalLoading(true)
      const detail = await fetchCustomerById(sessionToken, customerId)
      const normalized = {
        id: detail?.id ?? detail?.customerId ?? customerId,
        name:
          detail?.name ||
          `${detail?.firstName ?? ''} ${detail?.lastName ?? ''}`.trim() ||
          '-',
        email: detail?.email || '-',
        phone: detail?.phone || detail?.phoneNumber || '-',
        status: detail?.status || detail?.state || 'Active',
        createdAt: formatDate(detail?.createdAt || detail?.registrationDate),
        lastSeen: formatDate(detail?.lastSeenAt || detail?.lastLoginAt),
        totalTransactions: detail?.totalTransactions ?? 0,
        totalVolume: detail?.totalVolume ?? 0,
        address: detail?.address || '-',
      }
      setModalCustomer(normalized)
      setModalError('')
    } catch (detailError) {
      setModalError(detailError.message || 'Unable to load customer details.')
    } finally {
      setModalLoading(false)
    }
  }

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
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>

      <div className="users-filters">
        <div className="filter-chip selectable">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => handleStatusFilter(event.target.value)}
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="filter-chip readonly">
          <span>Registration Date</span>
          <span className="chevron" aria-hidden="true">▾</span>
        </div>
      </div>

      <section className="users-table-section">
        {error ? (
          <div className="users-error" role="alert">
            {error}
          </div>
        ) : null}
        <div className="users-table-wrapper" aria-busy={loading}>
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
              {loading ? (
                <tr>
                  <td colSpan={7} className="table-placeholder">
                    Loading customers…
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="table-placeholder">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((user) => (
                  <tr key={user.id}>
                    <td className="link-like">{user.id}</td>
                    <td>{user.name}</td>
                    <td className="link-like">{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.registrationDate}</td>
                    <td>
                      <span
                        className={`status-pill ${
                          String(user.status).toLowerCase() === 'active'
                            ? 'status-active'
                            : 'status-suspended'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <span
                        className="link-like"
                        onClick={() => {
                          openModal({ id: user.id })
                          handleViewDetails(user.id)
                        }}
                      >
                        View Details
                      </span>
                      <span className="divider">|</span>
                      <span className="link-like">Edit</span>
                      <span className="divider">|</span>
                      <span className="link-like">
                        {String(user.status).toLowerCase() === 'active' ? 'Suspend' : 'Activate'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen ? (
        <div className="user-modal-overlay" role="dialog" aria-modal="true">
          <div className="user-modal">
            <div className="user-modal-header">
              <h3>Customer Details</h3>
              <button type="button" className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            {modalError ? (
              <div className="user-modal-error">{modalError}</div>
            ) : null}

            {modalLoading || !modalCustomer ? (
              <div className="user-modal-body loading">Loading customer…</div>
            ) : (
              <div className="user-modal-body">
                <div className="modal-section">
                  <h4>Profile</h4>
                  <div className="modal-grid">
                    <div>
                      <span className="modal-label">Customer ID</span>
                      <span className="modal-value">{modalCustomer.id}</span>
                    </div>
                    <div>
                      <span className="modal-label">Name</span>
                      <span className="modal-value">{modalCustomer.name}</span>
                    </div>
                    <div>
                      <span className="modal-label">Email</span>
                      <span className="modal-value">{modalCustomer.email}</span>
                    </div>
                    <div>
                      <span className="modal-label">Phone</span>
                      <span className="modal-value">{modalCustomer.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-section">
                  <h4>Account Activity</h4>
                  <div className="modal-grid">
                    <div>
                      <span className="modal-label">Status</span>
                      <span className="modal-value">{modalCustomer.status}</span>
                    </div>
                    <div>
                      <span className="modal-label">Registered</span>
                      <span className="modal-value">{modalCustomer.createdAt}</span>
                    </div>
                    <div>
                      <span className="modal-label">Last Seen</span>
                      <span className="modal-value">{modalCustomer.lastSeen || '-'}</span>
                    </div>
                    <div>
                      <span className="modal-label">Total Transactions</span>
                      <span className="modal-value">{modalCustomer.totalTransactions ?? 0}</span>
                    </div>
                    <div>
                      <span className="modal-label">Total Volume</span>
                      <span className="modal-value">{modalCustomer.totalVolume ?? 0}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-section">
                  <h4>Contact</h4>
                  <div className="modal-grid">
                    <div>
                      <span className="modal-label">Address</span>
                      <span className="modal-value">{modalCustomer.address || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="user-modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Users
