import { useEffect, useRef, useState } from "react";
import styles from "./OnCallWorkflow.module.css";

type Answer = { step: string; label: string; next: string };
type Choice = { label: string; next: string };
const key = "ir-on-call-v1";

function stepFor(id: string, history: Answer[]): { title: string; lines: string[]; choices: Choice[] } {
  const moderate = history.some(a => a.label === "Moderate sedation");
  const anesthesia = history.some(a => a.label === "Anesthesia support");
  const steps: Record<string, ReturnTypeShape> = {
    consult: { title: "New consult", lines: ["Patient name and reason for consult", "Clinical appearance, exam findings, and vitals", "Pertinent labs and available imaging", "Any blood thinners? Which agents and when was the last dose?", "Any prior relevant interventions?", "Can the patient lie flat? On oxygen or limited cardiopulmonary reserve?", "How urgent does the consulting team feel this is?", "Admission plan and assigned bed", "Can the patient consent? If not, identify the appropriate surrogate."], choices: [{ label: "Consult reviewed", next: "decision" }] },
    decision: { title: "Discuss with attending", lines: ["Select the agreed plan."], choices: [{ label: "Proceed tonight", next: "request" }, { label: "Defer / reassess", next: "defer" }, { label: "No procedure", next: "no-procedure" }] },
    request: { title: "Update the consulting team", lines: ["Communicate the plan to proceed tonight.", "Ask the consulting team to place an IR Procedure Request order for the planned procedure."], choices: [{ label: "Team updated and request placed", next: "sedation" }] },
    sedation: { title: "Choose the sedation plan", lines: [], choices: [{ label: "Local anesthesia only", next: "consent" }, { label: "Moderate sedation", next: "consent" }, { label: "Anesthesia support", next: "consent" }] },
    consent: { title: "Arrive, assess, and consent", lines: ["Resident arrives at the hospital and assesses the patient.", "Obtain consent before calling in the IR team.", ...(moderate ? ["Complete the moderate sedation assessment at the time of consent."] : [])], choices: [{ label: "Assessment and consent completed", next: anesthesia ? "anesthesia" : "page" }] },
    anesthesia: { title: "Coordinate anesthesia support", lines: ["Contact anesthesia when proceeding with the case.", "Phone / pager: to be added.", "If already intubated and sedated, confirm the team responsible for sedation and airway management."], choices: [{ label: "Support confirmed", next: "page" }] },
    page: { title: "Page the IR team", lines: ["7676767", "Include patient name and MRN, procedure name, your first name, and callback number."], choices: [{ label: "Team paged", next: "protocol" }] },
    protocol: { title: "Protocol the order and complete the consult note", lines: ["Protocol Worklist → IR Procedures → Change Order", "Select the procedure you are doing → Accept", "Complete the IR consult note."], choices: [{ label: "Order protocoled and consult note completed", next: "snapboard" }] },
    snapboard: { title: "Add the case to Snapboard", lines: ["Open Snapboard and drag the case onto the board."], choices: [{ label: "Case added", next: "done" }] },
    defer: { title: "Call back the consulting team", lines: ["Communicate the plan to defer or reassess."], choices: [{ label: "Team updated", next: "defer-note" }] },
    "defer-note": { title: "Write an event note", lines: ["Document the discussion and agreed plan."], choices: [{ label: "Note completed", next: "signout" }] },
    signout: { title: "Add to sign-out", lines: ["Include the case for tomorrow's discussion."], choices: [{ label: "Added to sign-out", next: "done" }] },
    "no-procedure": { title: "Write an event note", lines: ["Document the attending discussion and decision for no procedure."], choices: [{ label: "Note completed", next: "done" }] },
    done: { title: "Workflow complete", lines: [history.some(a => a.label === "Proceed tonight") ? "The coordination steps are complete." : "The consult branch is complete."], choices: [] },
  };
  return steps[id] || steps.consult;
}
type ReturnTypeShape = { title: string; lines: string[]; choices: Choice[] };

function restore(): Answer[] {
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(key) || "[]");
    if (!Array.isArray(saved)) return [];
    const valid: Answer[] = [];
    for (const item of saved) {
      const current = valid.at(-1)?.next || "consult";
      if (!item || item.step !== current || !stepFor(current, valid).choices.some(c => c.label === item.label && c.next === item.next)) break;
      valid.push(item);
    }
    return valid;
  } catch { return []; }
}

export function OnCallWorkflow() {
  const [history, setHistory] = useState<Answer[]>(restore);
  const [resetting, setResetting] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const current = history.at(-1)?.next || "consult";
  const step = stepFor(current, history);
  useEffect(() => {
    try { sessionStorage.setItem(key, JSON.stringify(history)); } catch { /* Progress remains available in memory. */ }
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [history]);

  return <section className={styles.workflow}>
    <div className={styles.titleRow}><div><p className={styles.eyebrow}>Resident workflow</p><h1>On call</h1></div>
      {history.length > 0 && <button className={styles.reset} onClick={() => setResetting(true)}>New consult</button>}
    </div>
    {resetting && <div className={styles.resetPrompt} role="alert">
      <p>Clear this workflow and start a new consult?</p>
      <button onClick={() => { setHistory([]); setResetting(false); }}>Start new consult</button>
      <button onClick={() => setResetting(false)}>Keep current consult</button>
    </div>}
    <ol className={styles.path} aria-label="Consult progress">
      {history.map((answer, index) => <li key={answer.step} className={styles.completed}>
        <span className={styles.dot} aria-hidden="true">✓</span>
        <button onClick={() => setHistory(history.slice(0, index))} title="Return to this step"><span>{stepFor(answer.step, history.slice(0, index)).title}</span><small>{answer.label}</small></button>
      </li>)}
      <li className={styles.active}>
        <span className={styles.dot} aria-hidden="true">{current === "done" ? "✓" : history.length + 1}</span>
        <div className={styles.step}>
          <p className={styles.eyebrow}>{current === "done" ? "Complete" : "Current step"}</p>
          <h2 ref={heading} tabIndex={-1}>{step.title}</h2>
          {step.lines.length > 0 && <ul>{step.lines.map(line => <li key={line} className={line === "7676767" ? styles.pager : undefined}>{line}</li>)}</ul>}
          <div className={styles.choices}>{step.choices.map(choice => <button key={choice.label} onClick={() => setHistory([...history, { step: current, ...choice }])}>{choice.label}<span aria-hidden="true">→</span></button>)}</div>
          {current === "done" && <button className={styles.nextConsult} onClick={() => setResetting(true)}>Start new consult</button>}
          {history.length > 0 && <button className={styles.back} onClick={() => setHistory(history.slice(0, -1))}>← Back</button>}
        </div>
      </li>
    </ol>
  </section>;
}
