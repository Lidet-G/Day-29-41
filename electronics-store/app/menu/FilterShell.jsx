"use client";

import { Suspense } from "react";
import CategoryBar from "./CategoryBar";

export default function FilterShell({ children }) {
  return (
    <section className="filter-shell">
      <Suspense fallback={<p>Loading categories...</p>}>
        <CategoryBar />
      </Suspense>
      <div className="filter-shell-content">{children}</div>
    </section>
  );
}
