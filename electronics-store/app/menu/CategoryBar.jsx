"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { label: "All dishes", value: "all" },
  { label: "Main dishes", value: "main" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Drinks", value: "drinks" },
];

export default function CategoryBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("category") || "all";

  function selectCategory(category) {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") params.delete("category");
    else params.set("category", category);
    const query = params.toString();
    router.push(query ? `/menu?${query}` : "/menu");
  }

  return (
    <nav className="category-bar" aria-label="Dish categories">
      {categories.map((category) => (
        <button
          key={category.value}
          type="button"
          className={selected === category.value ? "category-button active" : "category-button"}
          aria-pressed={selected === category.value}
          onClick={() => selectCategory(category.value)}
        >
          {category.label}
        </button>
      ))}
    </nav>
  );
}
