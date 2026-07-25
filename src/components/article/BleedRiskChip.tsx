import type { BleedRisk } from "@/schema/article";
import styles from "./BleedRiskChip.module.css";

export function BleedRiskChip({ risk }: { risk: BleedRisk }) {
  return (
    <span className={styles.chip} data-risk={risk}>
      <span className={styles.dot} aria-hidden="true" />
      {risk === "high" ? "High bleeding risk" : "Low bleeding risk"}
    </span>
  );
}
