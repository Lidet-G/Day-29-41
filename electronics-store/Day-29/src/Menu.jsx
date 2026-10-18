import { useEffect, useRef, useState } from "react";
import { loadDishes } from "./api";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchRef = useRef(null);

useEffect(() => {
  if (searchRef.current) {
    searchRef.current.focus();
  }
}, []);

  useEffect(() => {
    const ctrl = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await loadDishes(category, ctrl.signal);
        setDishes(data);
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

  if (loading) {
    return <p>Loading the menu...</p>;
  }

  if (error) {
    return <p className="err">{error}</p>;
  }

  return (
    <>
      <input
        ref={searchRef}
        placeholder="Search dishes..."
      />

      <CategoryBar
        selected={category}
        onSelect={setCategory}
      />

      <DishList dishes={dishes} />
    </>
  );
}

export default Menu;