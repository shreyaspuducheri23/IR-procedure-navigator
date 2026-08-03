import { Outlet } from "react-router-dom";
import { FeedbackProvider } from "@/feedback/FeedbackContext";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import { FeedbackDialog } from "@/components/feedback/FeedbackDialog";
import { AppHeader } from "./AppHeader";
import { ScrollManager } from "./ScrollManager";
import styles from "./AppLayout.module.css";

export function AppLayout() {
  return (
    <FeedbackProvider>
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
          <p>
            <FeedbackButton variant="link">Send feedback</FeedbackButton>
          </p>
        </footer>
        <ScrollManager />
        {/* One dialog for the whole app; any trigger opens this instance. */}
        <FeedbackDialog />
      </div>
    </FeedbackProvider>
  );
}
