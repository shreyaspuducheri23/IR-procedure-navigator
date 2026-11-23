import { Link, NavLink, useLocation } from "react-router-dom";
import { toolFolders, nestedToolFolders } from "@/components/workflow/ToolsAndSystems";
import { SearchBar } from "./SearchBar";
import styles from "./AppHeader.module.css";

export function AppHeader() {
  const { pathname } = useLocation();
  const toolsOpen = pathname === "/tools" || pathname.startsWith("/tools/");
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} aria-label="Home — all procedures">
          <span className={styles.mark} aria-hidden="true">
            IR
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>IR Reference Guide</span>
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
        <NavLink to="/faq">General FAQ</NavLink>
        <NavLink to="/tools">Tools and Systems</NavLink>
        {toolsOpen && <div className={styles.folders}>
          {toolFolders.map(folder => <div key={folder.id}>
            <NavLink to={`/tools/${folder.id}`} end>{folder.title}</NavLink>
            {nestedToolFolders[folder.id] && pathname.startsWith(`/tools/${folder.id}`) && <div className={styles.wireFolders}>
              {nestedToolFolders[folder.id].map(child => <NavLink key={child.id} to={`/tools/${folder.id}/${child.id}`}>{child.title}</NavLink>)}
            </div>}
          </div>)}
        </div>}
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
