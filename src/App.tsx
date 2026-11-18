import { lazy, Suspense } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "@/components/home/HomePage";
import { ArticlePage } from "@/components/article/ArticlePage";
import { NotFound } from "@/components/NotFound";
import { OnCallWorkflow } from "@/components/workflow/OnCallWorkflow";
import { TdcRemoval } from "@/components/workflow/TdcRemoval";
import { GeneralFAQ } from "@/components/faq/GeneralFAQ";
import { EConsultGuide } from "@/components/faq/EConsultGuide";
import { ClinicalFAQ } from "@/components/faq/ClinicalFAQ";
import { PagerGuide } from "@/components/faq/PagerGuide";

/**
 * The editor is its own chunk: readers at the bedside never download it, only
 * someone who presses Edit does.
 */
const EditorPage = lazy(() => import("@/editor/EditorPage").then((module) => ({ default: module.EditorPage })));

const editor = (
  <Suspense fallback={null}>
    <EditorPage />
  </Suspense>
);

/**
 * Hash routing keeps deep links working on GitHub Pages project sites without a
 * 404.html redirect shim. Swapping to createBrowserRouter later only touches
 * this file.
 */
const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/on-call", element: <OnCallWorkflow /> },
      { path: "/tdc-removal", element: <TdcRemoval /> },
      { path: "/faq", element: <GeneralFAQ /> },
      { path: "/faq/e-consult", element: <EConsultGuide /> },
      { path: "/faq/anesthesia", element: <ClinicalFAQ topic="anesthesia" /> },
      { path: "/faq/drain-flushing", element: <ClinicalFAQ topic="drain-flushing" /> },
      { path: "/faq/pager", element: <PagerGuide /> },
      { path: "/article/:id", element: <ArticlePage /> },
      { path: "/article/:id/edit", element: editor },
      { path: "/new", element: editor },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
