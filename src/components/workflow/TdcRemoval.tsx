import { Link } from "react-router-dom";
import styles from "./OnCallWorkflow.module.css";

export function TdcRemoval() {
  return <section className={styles.workflow}>
    <Link to="/">All procedures</Link>
    <h1>TDC Removal</h1>
    <p>Draft: tools and removal workflow pending review.</p>
  </section>;
}
