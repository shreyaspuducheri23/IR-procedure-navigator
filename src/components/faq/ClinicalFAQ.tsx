import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./GeneralFAQ.module.css";

export function ClinicalFAQ({ topic }: { topic: "anesthesia" | "drain-flushing" }) {
  useEffect(() => { window.scrollTo(0, 0); }, [topic]);
  const anesthesia = topic === "anesthesia";
  return <section className={styles.page}>
    <Link to="/faq">Back to General FAQ</Link>
    <h1 className={styles.guideTitle}>{anesthesia ? "Coordinating Anesthesia" : "General drain flushing instructions"}</h1>
    <div className={styles.instructions}>
      {anesthesia ? <>
        <h2>More emergent procedures</h2>
        <p>Call the anesthesia floor leader at <a href="tel:+16172395845">+1 (617) 239-5845</a> <strong>or</strong> page the anesthesia on-call resident.</p>
        <p>Provide case details, timing, and urgency.</p>
        <p>Moderate sedation note is not required when anesthesia is providing care.</p>
      </> : <ul>
        <li><strong>Nephrostomy:</strong> Flush with 10 mL sterile saline twice daily until output is urine-colored.</li>
        <li><strong>Cholecystostomy:</strong> Flush with 10 mL sterile saline once daily.</li>
        <li><strong>Biliary drain:</strong> Flush with 10 mL sterile saline once daily.</li>
        <li><strong>Abscess drain:</strong> Flush with 10 mL sterile saline twice daily while admitted; once daily after discharge.</li>
      </ul>}
    </div>
  </section>;
}
