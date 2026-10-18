import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { useFetch } from "./hooks/useFetch";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const category =
    searchParams.get("category") || "All";

  const {
    data,
    loading,
    error
  } = useFetch(category);

  const shown = useMemo(() => {
    return [...data].sort(
      (a, b) => a.price - b.price
    );
  }, [data]);

  function choose(category) {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  }

  if (loading) {
    return <p>Loading the menu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h2>Menu</h2>

      <CategoryBar
        selected={category}
        onSelect={choose}
      />

      <DishList dishes={shown} />
    </>
  );
}

export default Menu;