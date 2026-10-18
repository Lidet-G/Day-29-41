import { NextResponse } from "next/server";
import { dishes } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const searchTerm = (searchParams.get("q") || "").toLowerCase();
  const category = (searchParams.get("category") || "").toLowerCase();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = 3;

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm);

    const matchesCategory =
      !category ||
      category === "all" ||
      dish.category.toLowerCase() === category;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDishes.length / pageSize)
  );

  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageDishes = filteredDishes.slice(start, start + pageSize);

  return NextResponse.json({
    dishes: pageDishes,
    page: safePage,
    totalPages,
    totalDishes: filteredDishes.length,
  });
}
