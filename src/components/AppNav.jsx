import { NavLink } from 'react-router-dom'
import styles from './AppNav.module.css'

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">翻译结果</NavLink>
        </li>
        <li>
          <NavLink to="countries">支持翻译语言</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AppNav
