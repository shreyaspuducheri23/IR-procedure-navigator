import { useState } from "react";
import {
  anticoagulationAgents as agents,
  anticoagulationProcedureRules,
  anticoagulationRecommendation,
  type Context,
  type Risk,
} from "@/calculators/anticoagulation";

const procedures = [...anticoagulationProcedureRules].sort((a, b) =>
  a.label.localeCompare(b.label),
);
const risks = ["All", "High", "Low", "Conditional", "Review"] as const;
export function AnticoagulationMatrix() {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState<Risk | "All">("All");
  const [context, setContext] = useState<Context>({
    crclBand: "ge50",
    enoxaparinDose: "therapeutic",
  });
  const [selected, setSelected] = useState<{
    label: string;
    agentId: string;
  } | null>(null);
  const visible = procedures.filter(
    (p) =>
      (risk === "All" || p.risk === risk) &&
      `${p.label} ${p.procedureTitle}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const selectedProcedure = procedures.find((p) => p.label === selected?.label);
  const selectedAgent = agents.find((a) => a.id === selected?.agentId);
  const recommendation =
    selectedProcedure && selectedAgent
      ? anticoagulationRecommendation(selectedProcedure, selectedAgent, context)
      : null;
  function changeContext(next: Context) {
    setContext(next);
    setSelected(null);
  }
  return (
    <section
      className="anticoag-matrix"
      aria-label="Anticoagulation reference matrix"
    >
      <div className="anticoag-source">
        <strong>Published baseline: SIR 2019 Part II, Tables 3 and 6</strong>
        <p>
          SIR announced an update in May 2025, but this navigator does not treat
          an unpublished update as a clinical rule. Validate against the
          approved institutional table before deployment.
        </p>
        <div>
          <a
            href="https://www.jvir.org/article/S1051-0443(19)30407-5/fulltext"
            target="_blank"
            rel="noreferrer"
          >
            SIR guideline
          </a>
          <a
            href="https://www.sirweb.org/publications/news/announcing-the-2025-guidelines-and-statements-topics/"
            target="_blank"
            rel="noreferrer"
          >
            Update status
          </a>
        </div>
      </div>
      <div className="anticoag-controls">
        <label className="anticoag-search">
          <span>Find procedure</span>
          <input
            type="search"
            placeholder="Search this table"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <fieldset className="anticoag-risk-filter">
          <legend>Bleeding risk</legend>
          {risks.map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="anticoag-risk-filter"
                value={value}
                checked={risk === value}
                onChange={() => setRisk(value)}
              />
              <span>{value}</span>
            </label>
          ))}
        </fieldset>
        <div className="anticoag-context-controls">
          <label>
            <span>Creatinine clearance</span>
            <select
              value={context.crclBand}
              onChange={(e) =>
                changeContext({
                  ...context,
                  crclBand: e.target.value as Context["crclBand"],
                })
              }
            >
              <option value="ge50">CrCl &gt;=50 mL/min</option>
              <option value="30to49">CrCl 30-49 mL/min</option>
              <option value="15to29">CrCl 15-29 mL/min</option>
              <option value="unknown">CrCl &lt;15 or unknown</option>
            </select>
          </label>
          <label>
            <span>Enoxaparin dose</span>
            <select
              value={context.enoxaparinDose}
              onChange={(e) =>
                changeContext({
                  ...context,
                  enoxaparinDose: e.target.value as Context["enoxaparinDose"],
                })
              }
            >
              <option value="therapeutic">Therapeutic</option>
              <option value="prophylactic">Prophylactic</option>
            </select>
          </label>
        </div>
      </div>
      <div className="anticoag-selection" aria-live="polite">
        <span>Selected recommendation</span>
        <strong>
          {recommendation
            ? `${selectedProcedure!.label} + ${selectedAgent!.label}`
            : "Choose a procedure and medication cell"}
        </strong>
        <p>
          {recommendation
            ? `${recommendation.hold}. ${recommendation.restart}. ${recommendation.note}`
            : "The source-based hold, restart, and procedure-mapping notes will appear here."}
        </p>
      </div>
      <p className="anticoag-status" role="status">
        {visible.length} procedure{visible.length === 1 ? "" : "s"} shown
      </p>
      <div
        className="anticoag-table-wrap"
        tabIndex={0}
        role="region"
        aria-label="Scrollable anticoagulation table"
      >
        <table
          className="anticoag-table"
          aria-label="Procedure anticoagulation hold and restart recommendations"
        >
          <thead>
            <tr>
              <th scope="col">Procedure</th>
              {agents.map((a) => (
                <th key={a.id} scope="col">
                  {a.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p.label}>
                <th scope="row">
                  <strong>{p.label}</strong>
                  <span
                    className={`anticoag-risk-badge ${p.risk.toLowerCase()}`}
                  >
                    {p.risk === "Review" ? "Needs review" : `${p.risk} risk`}
                  </span>
                </th>
                {agents.map((a) => {
                  const r = anticoagulationRecommendation(p, a, context);
                  const active =
                    selected?.label === p.label && selected.agentId === a.id;
                  return (
                    <td key={a.id}>
                      <button
                        type="button"
                        className={`anticoag-cell ${p.risk.toLowerCase()}${active ? " active" : ""}`}
                        aria-pressed={active}
                        aria-label={`${p.label}, ${a.label}: ${r.hold}; ${r.restart}`}
                        onClick={() =>
                          setSelected({ label: p.label, agentId: a.id })
                        }
                      >
                        <strong>{r.hold}</strong>
                        <span>{r.restart}</span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="anticoag-caveat">
        Educational reference, not a patient-specific order. Confirm dose,
        indication, renal and hepatic function, thrombotic risk, co-medications,
        hemostasis, and the current institutional policy before acting.
      </p>
    </section>
  );
}
