import { createHashRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "@/components/home/HomePage";
import { ArticlePage } from "@/components/article/ArticlePage";
import { NotFound } from "@/components/NotFound";
import { OnCallWorkflow } from "@/components/workflow/OnCallWorkflow";

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
      { path: "/article/:id", element: <ArticlePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
