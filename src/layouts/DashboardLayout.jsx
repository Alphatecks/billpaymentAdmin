import Sidebar from '../components/Sidebar'
import './DashboardLayout.css'

function DashboardLayout({ children, activeItem, onSelectMenu }) {
  return (
    <div className="dashboard-layout">
      <Sidebar activeItem={activeItem} onSelect={onSelectMenu} />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout

