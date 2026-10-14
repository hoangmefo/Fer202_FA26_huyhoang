import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/new', label: 'New' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  return (
    <nav className="navbar navbar-expand bg-light border-bottom">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Lab5
        </NavLink>
        <div className="navbar-nav">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
