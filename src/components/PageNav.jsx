import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import styles from './PageNav.module.css'

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        {/* <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li> */}
        <li>
          <NavLink to="/product">关于塞外</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default PageNav
