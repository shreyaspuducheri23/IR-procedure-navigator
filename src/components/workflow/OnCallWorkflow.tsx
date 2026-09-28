import { useEffect, useRef, useState } from "react";
import styles from "./OnCallWorkflow.module.css";
import { Link } from "react-router-dom";
import { staticContentSource } from "@/content/source";
import { Blocks } from "@/components/article/BlockRenderer";
import type { Article } from "@/schema/article";

const procedures = staticContentSource.listArticles()
  .filter(article => article.status === "complete" && !article.category.startsWith("reference"))
  .sort((a, b) => a.title.localeCompare(b.title));

type Answer = { step: string; label: string; next: string };
type Choice = { label: string; next: string };
const key = "ir-on-call-v1";

function stepFor(id: string, history: Answer[]): { title: string; lines: string[]; choices: Choice[] } {
  const moderate = history.some(a => a.label === "Moderate sedation");
  const anesthesia = history.some(a => a.label === "Anesthesia support");
  const steps: Record<string, ReturnTypeShape> = {
    consult: { title: "New consult", lines: ["Patient name and reason for consult", "Clinical appearance, exam findings, and vitals", "Pertinent labs and available imaging", "Any blood thinners? Which agents and when was the last dose?", "Any prior relevant interventions?", "Can the patient lie flat? On oxygen or limited cardiopulmonary reserve?", "Any airway concerns: obstruction, head/neck cancer, altered anatomy, or altered mental status?", "Opioid tolerance or regular opioid use?", "NPO status: when were the last solids and liquids?", "How urgent does the consulting team feel this is?", "Admission plan and assigned bed", "Can the patient consent? If not, identify the appropriate surrogate."], choices: [{ label: "Consult reviewed", next: "decision" }] },
    decision: { title: "Discuss with attending", lines: ["Select the agreed plan."], choices: [{ label: "Proceed now", next: "request" }, { label: "Defer / reassess", next: "defer" }, { label: "No procedure", next: "no-procedure" }] },
    request: { title: "Update the consulting team", lines: ["Communicate the plan to proceed now.", "Ask the consulting team to place an IR Procedure Request order for the planned procedure."], choices: [{ label: "Team updated and request placed", next: "sedation" }] },
    sedation: { title: "Choose the sedation plan", lines: [], choices: [{ label: "Local anesthesia only", next: "consent" }, { label: "Moderate sedation", next: "consent" }, { label: "Anesthesia support", next: "consent" }] },
    consent: { title: "Arrive, assess, and consent", lines: ["Resident arrives at the hospital and assesses the patient.", "Obtain consent before calling in the IR team.", ...(moderate ? ["Complete the moderate sedation assessment at the time of consent."] : [])], choices: [{ label: "Assessment and consent completed", next: anesthesia ? "anesthesia" : "page" }] },
    anesthesia: { title: "Coordinate anesthesia support", lines: ["Contact anesthesia when proceeding with the case.", "Phone / pager: to be added.", "If already intubated and sedated, confirm the team responsible for sedation and airway management."], choices: [{ label: "Support confirmed", next: "page" }] },
    page: { title: "Page the IR team", lines: ["7676767", "If the first-call team is already in use, page the second-call team at #2832.", "Include patient name and MRN, procedure name, your first name, and callback number."], choices: [{ label: "Team paged", next: "protocol" }] },
    protocol: { title: "Protocol the order and complete the consult note", lines: ["Open the IR Procedure Protocol List and select the case of interest.", "At the bottom, select No for IR clinic visit and Yes for Approved.", "Select Change Order above, choose the procedure you will perform, then select Accept.", "Back on the protocol screen, select Finalize in the bottom right.", "Complete the IR consult note."], choices: [{ label: "Order protocoled and consult note completed", next: "snapboard" }] },
    snapboard: { title: "Add the case to Snapboard", lines: ["Open Snapboard and select RAD VIR Inpatient at the bottom to find the case.", "Click and drag the case onto the Snapboard at the agreed room number and time."], choices: [{ label: "Case added", next: "done" }] },
    defer: { title: "Call back the consulting team", lines: ["Communicate the plan to defer or reassess.", "If proceeding later, ask the team to submit an IR Procedure Request for the planned procedure.", "Arrange NPO timing if sedation is planned, per the anticipated procedure time and local policy.", "Review anticoagulation holds for the procedure and the patient's medications.", "Arrange relevant morning labs using the procedure's lab requirements below; confirm any additional patient-specific testing."], choices: [{ label: "Team updated", next: "defer-note" }] },
    "defer-note": { title: "Write an event note", lines: ["Document the discussion and agreed plan."], choices: [{ label: "Note completed", next: "signout" }] },
    signout: { title: "Add to sign-out", lines: ["Include the case for tomorrow's discussion."], choices: [{ label: "Added to sign-out", next: "done" }] },
    "no-procedure": { title: "Write an event note", lines: ["Document the attending discussion and decision for no procedure."], choices: [{ label: "Note completed", next: "done" }] },
    done: { title: "Workflow complete", lines: [history.some(a => a.label === "Proceed now") ? "The coordination steps are complete." : "The consult branch is complete."], choices: [] },
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
      if (item?.step === "decision" && item.label === "Proceed tonight") item.label = "Proceed now";
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
  const [query, setQuery] = useState("");
  const [labArticle, setLabArticle] = useState<Article | null>(null);
  const [labStatus, setLabStatus] = useState("loading");
  const [procedureId, setProcedureId] = useState(() => {
    try { return sessionStorage.getItem(`${key}-procedure`) || ""; } catch { return ""; }
  });
  const selected = procedures.find(procedure => procedure.id === procedureId);
  const matches = procedures.filter(procedure => `${procedure.title} ${procedure.keywords.join(" ")}`.toLowerCase().includes(query.toLowerCase().trim()));
  useEffect(() => {
    try { sessionStorage.setItem(`${key}-procedure`, procedureId); } catch { /* Keep selection in memory. */ }
  }, [procedureId]);
  const heading = useRef<HTMLHeadingElement>(null);
  const current = history.at(-1)?.next || "consult";
  const step = stepFor(current, history);
  useEffect(() => {
    let cancelled = false;
    setLabArticle(null);
    setLabStatus("loading");
    if (current === "defer" && selected) {
      staticContentSource.getArticle(selected.id).then(article => {
        if (!cancelled) { setLabArticle(article); setLabStatus(article ? "ready" : "error"); }
      }).catch(() => { if (!cancelled) setLabStatus("error"); });
    }
    return () => { cancelled = true; };
  }, [current, selected?.id]);
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
      <button onClick={() => { setHistory([]); setProcedureId(""); setQuery(""); setResetting(false); }}>Start new consult</button>
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
          {["consent", "defer"].includes(current) && <div className={styles.procedurePicker}>
            <label htmlFor="consent-procedure-search">{current === "consent" ? "Procedure for consent" : "Planned procedure"}</label>
            <input id="consent-procedure-search" type="search" placeholder="Search procedures" value={query} onChange={event => setQuery(event.target.value)} />
            <select aria-label="Select procedure" value={procedureId} onChange={event => setProcedureId(event.target.value)}>
              <option value="">Select a procedure</option>
              {selected && !matches.some(item => item.id === selected.id) && <option value={selected.id}>{selected.title}</option>}
              {matches.map(procedure => <option key={procedure.id} value={procedure.id}>{procedure.title}</option>)}
            </select>
            {matches.length === 0 && <p role="status">No matching procedures.</p>}
            {selected && current === "consent" && <div className={styles.consentInfo}>
              <h3>{selected.title}</h3>
              <Link to={`/article/${selected.id}#pre/consent`}>Review consent information →</Link>
            </div>}
          </div>}
          {selected && ["page", "protocol", "snapboard"].includes(current) && <p><strong>Procedure:</strong> {selected.title}</p>}
          {step.lines.length > 0 && <ul>{step.lines.map(line => <li key={line} className={line === "7676767" ? styles.pager : undefined}>{line}</li>)}</ul>}
          {current === "defer" && <div className={styles.consentInfo}>
            <p><Link to="/article/anticoagulation-table">Review anticoagulation table →</Link></p>
            <h3>Morning labs</h3>
            {!selected ? <p>Select the planned procedure to review its lab requirements.</p> : <>
              {labStatus === "loading" && <p role="status">Loading lab requirements…</p>}
              {labArticle?.id === selected.id && <Blocks articleId={selected.id} blocks={labArticle.sections.find(section => section.kind === "pre")?.subsections?.find(section => section.title === "Labs")?.blocks || []} />}
              {labStatus === "error" && <p role="alert">Unable to load lab requirements. Open the procedure guide to review them.</p>}
              <p><Link to={`/article/${selected.id}#pre/labs`}>Open {selected.title} labs →</Link></p>
            </>}
          </div>}
          <div className={styles.choices}>{step.choices.map(choice => <button key={choice.label} onClick={() => setHistory([...history, { step: current, ...choice }])}>{choice.label}<span aria-hidden="true">→</span></button>)}</div>
          {current === "done" && <button className={styles.nextConsult} onClick={() => setResetting(true)}>Start new consult</button>}
          {history.length > 0 && <button className={styles.back} onClick={() => setHistory(history.slice(0, -1))}>← Back</button>}
        </div>
      </li>
    </ol>
  </section>;
}
