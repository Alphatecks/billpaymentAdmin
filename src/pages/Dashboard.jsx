import { useEffect, useMemo, useState } from 'react'
import MetricCard from '../components/MetricCard'
import Button from '../components/Button'
import ActivityTable from '../components/ActivityTable'
import './Dashboard.css'
import { fetchDashboardOverview, fetchRecentActivity } from '../services/dashboard'

const DEFAULT_METRICS = {
  transactions: { value: 0, change: '+0%', allTime: 0 },
  revenue: { value: 0, change: '+0%', allTime: 0 },
  activeUsers: { value: 0, change: '+0%', allTime: 0 },
  newUsers: { value: 0, change: '+0%', allTime: 0 },
}

const DEFAULT_ACTIONS = [
  { label: 'New Transaction', action: 'start_transaction' },
  { label: 'View All Transactions', action: 'view_transactions' },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value)
}

function formatChangeValue(change) {
  if (change == null) {
    return '+0%'
  }

  const numeric = Number(change)
  if (Number.isNaN(numeric)) {
    const changeStr = String(change)
    return changeStr.startsWith('-') ? changeStr : `+${changeStr}`
  }

  const absolute = Number.isInteger(numeric) ? Math.abs(numeric) : Math.abs(numeric).toFixed(1)
  const sign = numeric > 0 ? '+' : numeric < 0 ? '-' : '+'
  return `${sign}${absolute}%`
}

function Dashboard({ auth }) {
  const [metrics, setMetrics] = useState(DEFAULT_METRICS)
  const [quickActions, setQuickActions] = useState(DEFAULT_ACTIONS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recentActivity, setRecentActivity] = useState([])
  const [activityLoading, setActivityLoading] = useState(false)
  const [activityError, setActivityError] = useState('')

  const sessionToken = useMemo(() => auth?.token || auth?.session_token || auth?.access_token, [auth])

  useEffect(() => {
    let isMounted = true

    const loadMetrics = async () => {
      if (!sessionToken) {
        return
      }

      try {
        setLoading(true)
        setActivityLoading(true)
        const overview = await fetchDashboardOverview(sessionToken)
        if (!isMounted) return

        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.log('Supabase overview response', overview)
        }

        const totals = overview?.totals ?? {}
        const totalsAllTime = overview?.totalsAllTime ?? {}

        setMetrics({
          transactions: {
            value: totals.transactions?.value ?? 0,
            change: formatChangeValue(totals.transactions?.change),
            allTime: totalsAllTime.transactions ?? 0,
          },
          revenue: {
            value: totals.revenue?.value ?? 0,
            change: formatChangeValue(totals.revenue?.change),
            allTime: totalsAllTime.revenue ?? 0,
          },
          activeUsers: {
            value: totals.activeUsers?.value ?? 0,
            change: formatChangeValue(totals.activeUsers?.change),
            allTime: totalsAllTime.activeUsers ?? 0,
          },
          newUsers: {
            value: totals.newUsers?.value ?? 0,
            change: formatChangeValue(totals.newUsers?.change),
            allTime: totalsAllTime.newUsers ?? 0,
          },
        })

        const actions = Array.isArray(overview?.quickActions) && overview.quickActions.length
          ? overview.quickActions
          : DEFAULT_ACTIONS
        setQuickActions(actions)
        setError('')
      } catch (metricsError) {
        if (isMounted) {
          setError(metricsError.message || 'Unable to load dashboard metrics.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }

      try {
        const activityData = await fetchRecentActivity(sessionToken, 4)
        if (!isMounted) return

        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.log('Supabase recent activity response', activityData)
        }

        const normalized = activityData.map((item) => ({
          id: item.id ?? item.ticketId ?? item.transactionId,
          user: item.user || item.customer || item.email || '-',
          transactionType: item.transactionType || item.type || item.subject || '-',
          amount:
            typeof item.amount === 'number'
              ? formatCurrency(item.amount)
              : item.amount || '-',
          status: item.status || item.state || '-',
          date: item.date
            ? formatDate(item.date)
            : item.updatedAt
              ? formatDate(item.updatedAt)
              : item.createdAt
                ? formatDate(item.createdAt)
                : '-',
        }))

        setRecentActivity(normalized)
        setActivityError('')
      } catch (activityErrorResponse) {
        if (isMounted) {
          setRecentActivity([])
          setActivityError(
            activityErrorResponse.message || 'Unable to load recent activity right now.',
          )
        }
      } finally {
        if (isMounted) {
          setActivityLoading(false)
        }
      }
    }

    loadMetrics()

    return () => {
      isMounted = false
    }
  }, [sessionToken])

  const formatDate = (value) => {
    if (!value) return '-'
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) {
      return value
    }
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(parsed)
  }

  const formatMetricChangeClass = (change) => {
    if (typeof change !== 'string') return 'metric-change'
    if (change.startsWith('-')) return 'metric-change negative'
    return 'metric-change positive'
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Overview of key metrics and recent activity</p>
      </div>

      {error ? (
        <div className="dashboard-error" role="alert">
          {error}
        </div>
      ) : null}

      <div className="metrics-section" aria-busy={loading}>
        <MetricCard
          title="Total Transactions"
          value={formatNumber(metrics.transactions.value)}
          changeClass={formatMetricChangeClass(metrics.transactions.change)}
          change={metrics.transactions.change}
          allTime={formatNumber(metrics.transactions.allTime)}
        />
        <MetricCard
          title="Revenue"
          value={formatCurrency(metrics.revenue.value)}
          changeClass={formatMetricChangeClass(metrics.revenue.change)}
          change={metrics.revenue.change}
          allTime={formatCurrency(metrics.revenue.allTime)}
        />
        <MetricCard
          title="Active Users"
          value={formatNumber(metrics.activeUsers.value)}
          changeClass={formatMetricChangeClass(metrics.activeUsers.change)}
          change={metrics.activeUsers.change}
          allTime={formatNumber(metrics.activeUsers.allTime)}
        />
        <MetricCard
          title="New Users"
          value={formatNumber(metrics.newUsers.value)}
          changeClass={formatMetricChangeClass(metrics.newUsers.change)}
          change={metrics.newUsers.change}
          allTime={formatNumber(metrics.newUsers.allTime)}
        />
      </div>

      <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-buttons">
          {quickActions.map((action, index) => (
            <Button
              key={`${action.action || action.label}-${index}`}
              variant={index === 0 ? 'primary' : 'secondary'}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="recent-activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <ActivityTable rows={recentActivity} isLoading={activityLoading} errorMessage={activityError} />
      </div>
    </div>
  )
}

export default Dashboard

