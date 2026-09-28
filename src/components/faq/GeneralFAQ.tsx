import styles from "./GeneralFAQ.module.css";

export function GeneralFAQ() {
  return <section className={styles.page}>
    <h1>General FAQ</h1>
    <dl className={styles.entries}>
      <div>
        <dt>Consult pager number</dt>
        <dd>#4763</dd>
      </div>
    </dl>
  </section>;
}
