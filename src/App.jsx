import { useState, useMemo } from 'react'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Users from './pages/Users'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Support from './pages/Support'
import Login from './pages/Login'

const pages = {
  dashboard: Dashboard,
  transactions: Transactions,
  users: Users,
  reports: Reports,
  settings: Settings,
  support: Support,
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')

  const ActiveComponent = useMemo(() => pages[activePage] ?? Dashboard, [activePage])

  const handleMenuSelect = (item) => {
    if (pages[item]) {
      setActivePage(item)
    }
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <DashboardLayout activeItem={activePage} onSelectMenu={handleMenuSelect}>
      <ActiveComponent />
    </DashboardLayout>
  )
}

export default App

