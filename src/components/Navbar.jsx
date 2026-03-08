import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        Pet Journal
      </Link>

      <div className={styles.links}>
        <Link to="/login" className={`${styles.link} ${styles.linkLogin}`}>
          Log in
        </Link>
        <Link to="/register" className={`${styles.link} ${styles.linkRegister}`}>
          Register
        </Link>
      </div>

      <div className={styles.navMenu}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/pets">Pets</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;