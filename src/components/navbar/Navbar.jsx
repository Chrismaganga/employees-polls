import './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <NavLink
            to="/"
            exact
            className={({ isActive }) => isActive ? styles.active : styles.link}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink
            to="/add"
            className={({ isActive }) => isActive ? styles.active : styles.link}
          >
            New Poll
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) => isActive ? styles.active : styles.link}
          >
            Leaderboard
          </NavLink>
        </li>
        <li className={styles.li}>
          <NavLink
            to="/login"
            className={({ isActive }) => isActive ? styles.active : styles.link}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
