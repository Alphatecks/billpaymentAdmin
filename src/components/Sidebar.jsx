import './Sidebar.css'

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 10L10 3L17 10M3 10L10 13M3 10H17M17 10L10 13M10 13V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const TransactionsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2V4M10 16V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 6C8 5.44772 8.44772 5 9 5H11C11.5523 5 12 5.44772 12 6C12 6.55228 11.5523 7 11 7H9C8.44772 7 8 7.44772 8 8C8 8.55228 8.44772 9 9 9H11C11.5523 9 12 9.44772 12 10C12 10.5523 11.5523 11 11 11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11C11.5523 13 12 13.4477 12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 8C8.65685 8 10 6.65685 10 5C10 3.34315 8.65685 2 7 2C5.34315 2 4 3.34315 4 5C4 6.65685 5.34315 8 7 8Z" fill="currentColor"/>
    <path d="M13 8C14.6569 8 16 6.65685 16 5C16 3.34315 14.6569 2 13 2C11.3431 2 10 3.34315 10 5C10 6.65685 11.3431 8 13 8Z" fill="currentColor"/>
    <path d="M3 16C3 13.7909 4.79086 12 7 12C9.20914 12 11 13.7909 11 16V18H3V16Z" fill="currentColor"/>
    <path d="M9 16C9 13.7909 10.7909 12 13 12C15.2091 12 17 13.7909 17 16V18H9V16Z" fill="currentColor"/>
  </svg>
)

const ReportsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="12" width="4" height="5" fill="currentColor"/>
    <rect x="8" y="8" width="4" height="9" fill="currentColor"/>
    <rect x="13" y="4" width="4" height="13" fill="currentColor"/>
  </svg>
)

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.6569 4.34315L14.2426 5.75736M5.75736 14.2426L4.34315 15.6569M15.6569 15.6569L14.2426 14.2426M5.75736 5.75736L4.34315 4.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const SupportIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, active: true },
  { id: 'transactions', label: 'Transactions', icon: TransactionsIcon },
  { id: 'users', label: 'Customers', icon: UsersIcon },
  { id: 'reports', label: 'Reports', icon: ReportsIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
  { id: 'support', label: 'Support', icon: SupportIcon },
]

function Sidebar({ activeItem = 'dashboard', onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">BillPay Admin</h1>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const IconComponent = item.icon
          return (
            <div
              key={item.id}
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => onSelect?.(item.id)}
            >
              <span className="nav-icon">
                <IconComponent />
              </span>
              <span className="nav-label">{item.label}</span>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

