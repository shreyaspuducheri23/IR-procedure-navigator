import styles from "./GeneralFAQ.module.css";
import { Link } from "react-router-dom";

export function GeneralFAQ() {
  return <section className={styles.page}>
    <h1>General FAQ</h1>
    <Link className={styles.guideLink} to="/faq/pager">How to switch over the pager</Link>
    <dl className={styles.entries}>
      <div>
        <dt>Consult pager number</dt>
        <dd>#4763</dd>
      </div>
    </dl>
  </section>;
}
