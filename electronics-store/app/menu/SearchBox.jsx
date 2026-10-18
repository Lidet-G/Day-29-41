"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function SearchBox() {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [term]);

  const { data, error, isLoading } = useSWR(
    debouncedTerm
      ? `/api/dishes?q=${encodeURIComponent(debouncedTerm)}&page=1`
      : null,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return (
    <section className="exercise-section">
      <h2>Search the menu</h2>

      <label htmlFor="dish-search">Dish name</label>
      <input
        id="dish-search"
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Try Kitfo or Shiro"
      />

      {!debouncedTerm && (
        <p>Type a dish name to search.</p>
      )}

      {error && <p>Could not load search results.</p>}

      {isLoading && data && <p>Updating results...</p>}

      {data && (
        <ul className="dish-list">
          {data.dishes.length > 0 ? (
            data.dishes.map((dish) => (
              <li key={dish.id}>
                {dish.name} — {dish.price} ETB
              </li>
            ))
          ) : (
            <li>No dishes found.</li>
          )}
        </ul>
      )}
    </section>
  );
}