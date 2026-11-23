import { Link } from "react-router-dom";
import { useState } from "react";
import { Subsection } from "@/components/article/Subsection";
import type { Block } from "@/schema/article";
import styles from "./OnCallWorkflow.module.css";

export function TdcRemoval() {
  const [open, setOpen] = useState<string | null>("tools");
  const topics: { id: string; title: string; blocks: Block[] }[] = [
    { id: "tools", title: "Tools you need", blocks: [{ type: "list", items: [
      "Local anesthetic: 1% lidocaine, with or without epinephrine.",
      "Sterile gloves: your size.",
      "Syringe: 10 mL.",
      "Needles: 21-22G and 18G.",
      "Skin prep: ChloraPrep stick or alcohol swabs.",
      "Suture removal kit: scissors and forceps.",
      "Gauze: 4 x 4 pack.",
      "Sterile drape.",
      "Specimen cup: if sending tip.",
      "Needle driver.",
    ] }, { type: "paragraph", text: "An IR supply duffle is available. Check its contents and add any supplies you need before bringing it to the patient's room for removal." }] },
    { id: "prep", title: "Prep", blocks: [{ type: "paragraph", text: "Content pending." }] },
    { id: "removal", title: "Steps of removal", blocks: [{ type: "paragraph", text: "Content pending." }] },
  ];
  return <section className={styles.workflow}>
    <Link to="/">All procedures</Link>
    <h1>Tunneled Dialysis Catheter</h1>
    <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
      {topics.map(topic => <Subsection key={topic.id}
        subsection={topic}
        articleId="tdc-removal" open={open === topic.id}
        onToggle={() => setOpen(open === topic.id ? null : topic.id)} />)}
    </div>
  </section>;
}
