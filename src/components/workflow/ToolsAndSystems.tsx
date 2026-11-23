import { Link, useParams } from "react-router-dom";
import { NotFound } from "@/components/NotFound";
import styles from "@/components/faq/GeneralFAQ.module.css";

export const toolFolders = [
  { id: "sheaths", title: "Sheaths" },
  { id: "wires", title: "Wires" },
  { id: "catheters", title: "Catheters" },
  { id: "biopsy-devices", title: "Biopsy devices" },
  { id: "needles", title: "Needles" },
  { id: "systems", title: "Systems" },
  { id: "embolics", title: "Embolics" },
  { id: "closure-devices", title: "Closure devices" },
  { id: "tube", title: "Tube" },
  { id: "miscellaneous", title: "Miscellaneous" },
];

export const wireFolders = [
  { id: "working-wires", title: "Working wires" },
  { id: "microwires", title: "Microwires" },
];

export const embolicFolders = [
  { id: "liquid-embolics", title: "Liquid embolics" },
  { id: "coils", title: "Coils" },
  { id: "glue", title: "Glue" },
  { id: "gel-foam", title: "Gel foam" },
  { id: "plugs", title: "Plugs" },
];

export const nestedToolFolders: Record<string, typeof wireFolders> = {
  wires: wireFolders,
  embolics: embolicFolders,
};

export function ToolsAndSystems() {
  const { category, subcategory } = useParams();
  const folder = toolFolders.find(item => item.id === category);
  const nested = category ? nestedToolFolders[category] ?? [] : [];
  const child = nested.find(item => item.id === subcategory);
  if ((category && !folder) || (subcategory && !child)) return <NotFound />;
  const children = !category ? toolFolders : !subcategory ? nested : [];
  return <section className={styles.page}>
    {category && <nav aria-label="Breadcrumb">
      <Link to="/tools">Tools and Systems</Link>
      {subcategory && <> / <Link to={`/tools/${category}`}>{folder?.title}</Link></>}
    </nav>}
    <h1 className={category ? styles.guideTitle : undefined}>{child?.title ?? folder?.title ?? "Tools and Systems"}</h1>
    {children.map(item => <Link key={item.id} className={styles.guideLink}
      to={category ? `/tools/${category}/${item.id}` : `/tools/${item.id}`}>{item.title}</Link>)}
  </section>;
}
