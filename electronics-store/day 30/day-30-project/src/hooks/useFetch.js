import { useEffect, useState } from "react";
import { loadDishes } from "../api";

export function useFetch(category) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const dishes = await loadDishes(
          category,
          ctrl.signal
        );

        setData(dishes);
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => ctrl.abort();
  }, [category]);

  return {
    data,
    loading,
    error
  };
}