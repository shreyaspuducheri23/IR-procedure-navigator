import { Link, NavLink } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import styles from "./AppHeader.module.css";

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Home — all procedures">
          <span className={styles.mark} aria-hidden="true">
            IR
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>Procedure Navigator</span>
            <span className={styles.brandSub}>Resident reference</span>
          </span>
        </Link>

        <div className={styles.searchSlot}>
          <SearchBar />
        </div>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeButton}>
            <HomeIcon />
            <span>Home</span>
          </Link>
        </div>
      </div>
      <nav className={styles.navigation} aria-label="Main navigation">
        <NavLink to="/" end>Procedure guides</NavLink>
        <NavLink to="/on-call">On-Call Workflow</NavLink>
      </nav>
    </header>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path
        d="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
