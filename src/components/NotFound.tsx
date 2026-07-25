import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export function NotFound() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Not found</h1>
      <p className={styles.body}>
        That procedure doesn’t exist here yet. It may have been renamed, or it may still be
        waiting to be written.
      </p>
      <Link to="/" className={styles.link}>
        Back to all procedures
      </Link>
    </div>
  );
}
