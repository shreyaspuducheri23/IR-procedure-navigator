import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./GeneralFAQ.module.css";

function Screenshot({ file, alt, menu = false, ratio }: { file: string; alt: string; menu?: boolean; ratio?: string }) {
  return <div className={styles.screenshotScroll}>
    <img className={menu ? styles.menuScreenshot : styles.screenshot}
      style={ratio ? { aspectRatio: ratio, objectFit: "cover" } : undefined}
      src={`${import.meta.env.BASE_URL}images/e-consult/${file}.png`} alt={alt} />
  </div>;
}

export function EConsultGuide() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <section className={styles.page}>
    <Link to="/faq">Back to General FAQ</Link>
    <h1 className={styles.guideTitle}>How to prepare an E-consult</h1>
    <ol className={styles.steps}>
      <li><h2>Open the patient encounter</h2><p>Search for the patient and open the corresponding encounter.</p></li>
      <li><h2>Select Consult</h2>
        <Screenshot file="consult" ratio="11 / 1" alt="Epic Consult tab outlined in gold." />
      </li>
      <li><h2>Select Consents</h2>
        <Screenshot file="consents" menu alt="Consents menu item outlined in gold." />
      </li>
      <li><h2>Select New IR Procedure Consent</h2>
        <Screenshot file="new-consent" ratio="4.6 / 1" alt="New IR Procedure Consent button outlined in gold." />
      </li>
      <li><h2>Select the clinicians</h2>
        <p><strong>Regular hours:</strong> Select all attendings, then list the fellows/residents on service that week.</p>
        <p><strong>Weekend/on-call:</strong> List yourself and your attending.</p>
      </li>
      <li><h2>Enter the consent details</h2><p>Enter the procedure details and risks. Complete applicable fields for parent/guardian/HCP, telephone consent, interpreter, and witness.</p></li>
    </ol>
    <Link to="/faq">Back to General FAQ</Link>
  </section>;
}
