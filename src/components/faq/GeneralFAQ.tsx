import styles from "./GeneralFAQ.module.css";
import { Link } from "react-router-dom";

export function GeneralFAQ() {
  return <section className={styles.page}>
    <h1>General FAQ</h1>
    <Link className={styles.guideLink} to="/article/anticoagulation-table">Anticoagulation table</Link>
    <Link className={styles.guideLink} to="/faq/pager">How to switch over the pager</Link>
    <Link className={styles.guideLink} to="/faq/anesthesia">Involving Anesthesia in a procedure</Link>
    <Link className={styles.guideLink} to="/faq/drain-flushing">General drain flushing instructions</Link>
    <dl className={styles.entries}>
      <div>
        <dt>Consult pager number</dt>
        <dd>#4763</dd>
      </div>
    </dl>
  </section>;
}
