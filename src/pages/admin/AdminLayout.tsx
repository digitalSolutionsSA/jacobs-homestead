import { Navigate, Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './AdminLayout.css'

export default function AdminLayout() {
  const { user, loading, signOut } = useAuth()

  if (loading) return <div className="admin-loading">Loading...</div>
  if (!user) return <Navigate to="/admin/login" replace />

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span>🌿</span>
          <span>Admin</span>
        </div>
        <nav className="admin-sidebar__nav">
          <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/blogs" className={({ isActive }) => isActive ? 'active' : ''}>
            Blog Posts
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'active' : ''}>
            Products
          </NavLink>
        </nav>
        <button className="admin-sidebar__signout" onClick={signOut}>
          Sign Out
        </button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}
