import { Suspense } from "react";
import SearchBox from "./SearchBox";
import DishPagination from "./DishPagination";

export default function MenuPage() {
  return (
    <main className="exercise-container">
      <h1>Addis Eats Menu</h1>
      <p>Search for a dish or browse the menu by page.</p>

      <SearchBox />

      <Suspense fallback={<p>Loading menu pages...</p>}>
        <DishPagination />
      </Suspense>
    </main>
  );
}