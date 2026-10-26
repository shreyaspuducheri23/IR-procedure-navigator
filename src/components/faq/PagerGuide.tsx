import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./GeneralFAQ.module.css";

function Screenshot({ file, alt, ratio }: { file: string; alt: string; ratio?: string }) {
  return <div className={styles.screenshotScroll}>
    <img className={styles.screenshot} style={ratio ? { aspectRatio: ratio, objectFit: "cover" } : undefined}
      src={`${import.meta.env.BASE_URL}images/pager/${file}.png`} alt={alt} />
  </div>;
}

export function PagerGuide() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <section className={styles.page}>
    <Link to="/faq">Back to General FAQ</Link>
    <h1 className={styles.guideTitle}>How to switch over the pager</h1>
    <ol className={styles.steps}>
      <li><h2>Select BMC Directory in Epic</h2>
        <Screenshot file="directory" ratio="24 / 1" alt="Epic toolbar with BMC Directory outlined in gold." />
      </li>
      <li><h2>Log in</h2><p>Use the service credentials provided during orientation.</p></li>
      <li><h2>Select the IR consult service</h2><p>Select the light blue link: Interventional Radiology IR MD Consult inpatient &amp; ED.</p>
        <Screenshot file="service" ratio="6.6 / 1" alt="IR MD Consult inpatient and ED service link outlined in gold." />
      </li>
      <li><h2>Enter your personal pager number</h2><p>Enter your number in Covering Pager Id.</p>
        <Screenshot file="covering" alt="Covering Pager Id outlined in gold; personal name and pager numbers redacted." />
      </li>
      <li><h2>Select Change</h2>
        <Screenshot file="confirm" alt="Change button outlined in gold; personal name and pager numbers redacted." />
      </li>
    </ol>
    <Link to="/faq">Back to General FAQ</Link>
  </section>;
}
