import { useId, useState } from "react";
import { calculateMeldScores } from "@/calculators/meld";
import styles from "./MeldCalculator.module.css";

const initialLabs = { bilirubin: "2.0", inr: "1.5", creatinine: "1.0", sodium: "135", albumin: "3.0" };
const fields = [
  ["bilirubin", "Bilirubin (mg/dL)"],
  ["inr", "INR"],
  ["creatinine", "Creatinine (mg/dL)"],
  ["sodium", "Sodium (mEq/L)"],
  ["albumin", "Albumin (g/dL)"],
] as const;

export function MeldCalculator() {
  const id = useId();
  const [labs, setLabs] = useState(initialLabs);
  const [female, setFemale] = useState(false);
  const [dialysis, setDialysis] = useState(false);
  const scores = calculateMeldScores({ ...labs, female, dialysis });
  return (
    <section className={styles.calculator} aria-label="Adult MELD calculator">
      <p className={styles.note}>Adult MELD scores. Example labs are prefilled; replace them with the current values.</p>
      <div className={styles.grid}>
        {fields.map(([key, label]) => {
          const invalid = !Number.isFinite(Number(labs[key])) || Number(labs[key]) <= 0;
          return (
            <label className={styles.field} key={key} htmlFor={`${id}-${key}`}>
              <span>{label}</span>
              <input id={`${id}-${key}`} type="number" inputMode="decimal" min="0" step="any"
                value={labs[key]} aria-invalid={invalid || undefined}
                aria-describedby={invalid ? `${id}-error` : undefined}
                onChange={(event) => setLabs((previous) => ({ ...previous, [key]: event.target.value }))} />
            </label>
          );
        })}
      </div>
      <label className={styles.toggle}>
        <input type="checkbox" checked={female} onChange={(event) => setFemale(event.target.checked)} />
        Female
      </label>
      <label className={styles.toggle}>
        <input type="checkbox" checked={dialysis} aria-describedby={`${id}-dialysis`}
          onChange={(event) => setDialysis(event.target.checked)} />
        Dialysis criterion met
      </label>
      <div aria-live="polite" aria-atomic="true">
        <div className={styles.grid}>
          <div className={styles.result}><span>MELD-Na</span><strong>{scores?.meldNa ?? "—"}</strong></div>
          <div className={styles.result}><span>MELD 3.0</span><strong>{scores?.meld3 ?? "—"}</strong></div>
        </div>
        {!scores && <p id={`${id}-error`} className={styles.error}>Enter a positive number for every lab to calculate both scores.</p>}
      </div>
      <p id={`${id}-dialysis`} className={styles.note}>
        Dialysis criterion: at least two dialysis treatments in the last 7 days, or 24 hours of continuous
        veno-venous hemodialysis in the last 7 days. Qualifying dialysis sets creatinine to 4 mg/dL for MELD-Na
        and 3 mg/dL for MELD 3.0.
      </p>
      <p className={styles.note}>Scores use bounded labs and are rounded to integers from 6 to 40.
        MELD-Na applies sodium adjustment only when the rounded initial MELD exceeds 11.
        See Formula Notes below for all bounds.</p>
      <p className={styles.note}>Formula references: {" "}
        <a href="https://www.hrsa.gov/optn/data-calculators/allocation-calculators/meld-calculator" target="_blank" rel="noreferrer">HRSA OPTN</a>
        {" · "}<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8608337/" target="_blank" rel="noreferrer">Kim et al., MELD 3.0</a>
      </p>
    </section>
  );
}
