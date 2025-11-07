import { useEffect, useMemo, useState } from 'react'
import './Transactions.css'
import { fetchTransactionFilters, fetchTransactions } from '../services/transactions'

const DEFAULT_FILTERS = {
  type: '',
  status: '',
  user: '',
  startDate: '',
  endDate: '',
  search: '',
}

const DEFAULT_PAGINATION = {
  page: 1,
  limit: 25,
  total: 0,
}

function formatCurrency(value) {
  if (value == null) return '-'
  const numeric = Number(value)
  if (Number.isNaN(numeric)) return value
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(numeric)
}

function formatDate(value) {
  if (!value) return '-'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsed)
}

function Transactions({ auth }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [filterOptions, setFilterOptions] = useState({
    types: [],
    statuses: [],
    users: [],
  })
  const [searchValue, setSearchValue] = useState('')
  const [transactions, setTransactions] = useState([])
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION)
  const [loadingFilters, setLoadingFilters] = useState(false)
  const [filtersError, setFiltersError] = useState('')
  const [loadingList, setLoadingList] = useState(false)
  const [listError, setListError] = useState('')

  const sessionToken = useMemo(
    () => auth?.token || auth?.session_token || auth?.access_token,
    [auth],
  )

  useEffect(() => {
    if (!sessionToken) return

    let isMounted = true

    const loadFilters = async () => {
      try {
        setLoadingFilters(true)
        const options = await fetchTransactionFilters(sessionToken)
        if (!isMounted) return

        const types = options?.types || options?.transactionTypes || []
        const statuses = options?.statuses || []
        const users = options?.users || options?.customers || []

        setFilterOptions({ types, statuses, users })
        setFiltersError('')
      } catch (error) {
        if (isMounted) {
          setFiltersError(error.message || 'Unable to load filters.')
        }
      } finally {
        if (isMounted) {
          setLoadingFilters(false)
        }
      }
    }

    loadFilters()
    return () => {
      isMounted = false
    }
  }, [sessionToken])

  useEffect(() => {
    if (!sessionToken) return
    loadTransactions({ page: DEFAULT_PAGINATION.page, limit: DEFAULT_PAGINATION.limit }, DEFAULT_FILTERS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken])

  const loadTransactions = async ({ page, limit }, appliedFilters = filters) => {
    try {
      setLoadingList(true)
      const response = await fetchTransactions(sessionToken, {
        page,
        limit,
        status: appliedFilters.status,
        type: appliedFilters.type,
        user: appliedFilters.user,
        startDate: appliedFilters.startDate,
        endDate: appliedFilters.endDate,
        search: appliedFilters.search,
      })

      const items = response?.items ?? response?.data ?? []
      const meta = response?.meta ?? {
        page: response?.page ?? page,
        limit: response?.limit ?? limit,
        total: response?.total ?? items.length,
      }

      const normalized = items.map((item) => ({
        id: item.id ?? item.reference ?? item.transactionId ?? 'N/A',
        user: item.user || item.customer || item.email || '-',
        type: item.type || item.transactionType || '-',
        amount: formatCurrency(item.amount),
        status: item.status || '-',
        datetime: formatDate(item.date || item.createdAt || item.updatedAt),
      }))

      setTransactions(normalized)
      setPagination({
        page: meta.page ?? page,
        limit: meta.limit ?? limit,
        total: meta.total ?? normalized.length,
      })
      setListError('')
    } catch (error) {
      setTransactions([])
      setListError(error.message || 'Unable to load transactions.')
    } finally {
      setLoadingList(false)
    }
  }

  const totalPages = pagination.limit ? Math.max(1, Math.ceil(pagination.total / pagination.limit)) : 1

  const handleFilterChange = (field) => (event) => {
    const value = event.target.value
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleApplyFilters = () => {
    const appliedFilters = { ...filters, search: searchValue }
    setFilters(appliedFilters)
    loadTransactions({ page: 1, limit: pagination.limit }, appliedFilters)
  }

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchValue }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const handleReset = () => {
    const resetFilters = { ...DEFAULT_FILTERS }
    setFilters(resetFilters)
    setSearchValue('')
    loadTransactions({ page: 1, limit: pagination.limit }, resetFilters)
  }

  const handlePageChange = (nextPage) => {
    const validPage = Math.max(1, Math.min(totalPages, nextPage))
    if (validPage === pagination.page) return
    loadTransactions({ page: validPage, limit: pagination.limit })
  }

  const handleLimitChange = (event) => {
    const newLimit = Number(event.target.value) || 25
    setPagination((prev) => ({ ...prev, limit: newLimit }))
    loadTransactions({ page: 1, limit: newLimit })
  }

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
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </div>

      <section className="filters-section">
        <h2 className="section-heading">Filters</h2>
        {filtersError ? (
          <div className="filters-error" role="alert">
            {filtersError}
          </div>
        ) : null}
        <div className="filters-grid" aria-busy={loadingFilters}>
          <div className="form-field">
            <label>Transaction Type</label>
            <select value={filters.type} onChange={handleFilterChange('type')} disabled={loadingFilters}>
              <option value="">All types</option>
              {filterOptions.types.map((option) => (
                <option key={option.value ?? option} value={option.value ?? option}>
                  {option.label ?? option.name ?? option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>Status</label>
            <select value={filters.status} onChange={handleFilterChange('status')} disabled={loadingFilters}>
              <option value="">All statuses</option>
              {filterOptions.statuses.map((option) => (
                <option key={option.value ?? option} value={option.value ?? option}>
                  {option.label ?? option.name ?? option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>User</label>
            <select value={filters.user} onChange={handleFilterChange('user')} disabled={loadingFilters}>
              <option value="">All users</option>
              {filterOptions.users.map((option) => (
                <option key={option.value ?? option} value={option.value ?? option}>
                  {option.label ?? option.name ?? option.email ?? option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={handleFilterChange('startDate')}
              disabled={loadingFilters}
            />
          </div>
          <div className="form-field">
            <label>End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={handleFilterChange('endDate')}
              disabled={loadingFilters}
            />
          </div>
        </div>
        <div className="filters-actions">
          <button type="button" className="btn btn-primary" onClick={handleApplyFilters} disabled={loadingList}>
            {loadingList ? 'Applying…' : 'Apply Filters'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={loadingFilters || loadingList}>
            Reset
          </button>
        </div>
      </section>

      <section className="transactions-list-section">
        <div className="transactions-list-header">
          <h2 className="section-heading">Transaction List</h2>
          <div className="pagination-controls">
            <label>
              Rows per page
              <select value={pagination.limit} onChange={handleLimitChange}>
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <div className="pagination-buttons">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1 || loadingList}
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {pagination.page} of {totalPages}
              </span>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= totalPages || loadingList}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {listError ? (
          <div className="transactions-error" role="alert">
            {listError}
          </div>
        ) : null}

        <div className="transactions-table-wrapper" aria-busy={loadingList}>
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
              {loadingList ? (
                <tr>
                  <td colSpan={7} className="table-placeholder">
                    Loading transactions…
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="table-placeholder">
                    No transactions found for the selected filters.
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td className="link-like">{transaction.user}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.amount}</td>
                    <td>
                      <span className={`status-pill status-${String(transaction.status).toLowerCase()}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td>{transaction.datetime}</td>
                    <td className="link-like">View</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Transactions
