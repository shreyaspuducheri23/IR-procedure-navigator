import { Link } from "react-router-dom";
import { useState } from "react";
import { Subsection } from "@/components/article/Subsection";
import { BleedRiskChip } from "@/components/article/BleedRiskChip";
import type { Block } from "@/schema/article";
import styles from "./OnCallWorkflow.module.css";

const step = (strong: string, text: string) => [{ strong: `${strong}:` }, ` ${text}`];
const topics: { id: string; title: string; blocks: Block[] }[] = [
  { id: "tools", title: "Tools you need", blocks: [{ type: "list", items: [
    "Sterile gloves/gown, skin prep, drapes, gauze, and dressing.",
    "Lidocaine, syringe, and local-anesthetic needle.",
    "#10 blade, forceps, Kelly/hemostat, scissors, and needle driver.",
    "Absorbable deep dermal suture; finer absorbable subcuticular suture or skin glue.",
    "Specimen container if cultures are indicated.",
  ] }] },
  { id: "prep", title: "Prep", blocks: [{ type: "list", items: [
    "Confirm removal indication, side, consent, allergies, anticoagulation plan, and whether replacement access is needed.",
    "Check for pocket infection, skin erosion, or suspected fracture/tethering; review prior imaging if relevant.",
    "Usually local anesthesia. If pocket infection is present, confirm cultures, antibiotics, and wound-management plan before starting.",
  ] }] },
  { id: "removal", title: "Steps of removal", blocks: [
    { type: "list", items: [
      step("1. Prep and drape", "use sterile technique and expose the prior incision and port pocket."),
      step("2. Anesthetize", "start at one end of the scar and infiltrate along it superficially and deeply. Fan toward and around the pocket; track total lidocaine dose and test before incision."),
      step("3. Open the scar", "use a #10 blade for a controlled skin incision over the old scar. Deepen under direct vision until the reservoir/capsule is visible; avoid cutting the catheter. Open only enough to deliver the port."),
      step("4. Free the port", "bluntly dissect above and along both sides. Release the capsule and any anchoring sutures under direct vision before applying traction."),
      step("5. Expose the connection", "grasp the reservoir securely and gently elevate/rotate it toward you to expose the catheter connection. Avoid levering against resistance or clamping the catheter tubing."),
      step("6. Withdraw the catheter", "gently free the catheter from surrounding tissue and withdraw with slow, controlled traction while keeping the port attached. Coordinate breath hold/ventilation as appropriate and compress the venous tract. If tethered, stop; do not force, cut, or detach it."),
      step("7. Remove and inspect", "deliver the reservoir after catheter extraction. Verify the port, connection, catheter, and tip are intact; suspected missing fragments require imaging and attending assessment."),
      step("8. Obtain hemostasis", "apply pressure to the pocket and venous entry tract. Pause and reassess anesthesia for pain; do not continue through inadequate analgesia. Inspect for ongoing bleeding."),
      step("9. Close the deep layer", "for a clean pocket, approximate with buried interrupted absorbable sutures, deep-to-superficial then superficial-to-deep. 2-0 Vicryl is one option; choose size and number of bites for tissue thickness, tension, and dead space rather than a fixed 4-5 stitches."),
      step("10. Close the skin", "use a running subcuticular absorbable suture, often 4-0, or skin glue for well-approximated low-tension edges. Confirm material with the attending. Do not routinely seal an infected pocket; follow the agreed drainage/closure plan."),
      step("11. Finish", "confirm hemostasis, apply a dressing, and give wound-care and return precautions for bleeding, swelling, redness, drainage, or fever. Send cultures only as indicated."),
    ] },
    { type: "heading", text: "References" },
    { type: "list", items: [
      [{ link: { text: "NHS: Port-a-Cath removal", href: "https://www.ashfordstpeters.nhs.uk/leaflets/3806-interventional-radiology-leaflet-port-a-cath-access-port-removal" } }],
      [{ link: { text: "SaRePo: stepwise implanted-port removal", href: "https://journals.sagepub.com/doi/10.1177/11297298251333863" } }],
    ] },
  ] },
];

export function PortRemoval() {
  const [open, setOpen] = useState<string | null>("removal");
  return <section className={styles.workflow}>
    <Link to="/">All procedures</Link>
    <h1>Port Removal</h1>
    <BleedRiskChip risk="low" />
    <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
      {topics.map(topic => <Subsection key={topic.id} subsection={topic}
        articleId="port-removal" open={open === topic.id}
        onToggle={() => setOpen(open === topic.id ? null : topic.id)} />)}
    </div>
  </section>;
}
