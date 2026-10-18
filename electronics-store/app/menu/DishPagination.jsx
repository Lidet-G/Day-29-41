"use client";

import useSWR from "swr";
import { useRouter, useSearchParams } from "next/navigation";
import fetcher from "@/lib/fetcher";

export default function DishPagination() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const category = searchParams.get("category") || "all";

  const apiUrl =
    `/api/dishes?page=${page}&category=${encodeURIComponent(category)}`;

  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    keepPreviousData: true,
  });

  function changePage(nextPage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));

    router.push(`/menu?${params.toString()}`, {
      scroll: false,
    });
  }

  if (error) {
    return <p>Could not load dishes: {error.message}</p>;
  }

  if (isLoading || !data) {
    return <p>Loading dishes...</p>;
  }

  if (!Array.isArray(data.dishes)) {
    return (
      <p>
        Unexpected API response. Please check the dishes API route.
      </p>
    );
  }

  return (
    <section className="exercise-section">
      <h2>Browse dishes</h2>

      {data.dishes.length === 0 ? (
        <p>No dishes found in this category.</p>
      ) : (
        <ul className="dish-list">
          {data.dishes.map((dish) => (
            <li key={dish.id}>
              {dish.name} — {dish.price} ETB
            </li>
          ))}
        </ul>
      )}

      <div className="pagination">
        <button
          type="button"
          onClick={() => changePage(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>

        <span>
          Page {data.page} of {data.totalPages}
        </span>

        <button
          type="button"
          onClick={() => changePage(page + 1)}
          disabled={page >= data.totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}
