import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { ScrollManager } from "./ScrollManager";
import styles from "./AppLayout.module.css";

export function AppLayout() {
  return (
    <div className={styles.shell}>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>
          Educational draft for resident reference. Always confirm against institutional
          policy and the ordering physician before acting.
        </p>
      </footer>
      <ScrollManager />
    </div>
  );
}
