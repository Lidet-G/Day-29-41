import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DishDetail() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDish() {
      try {
        const res = await fetch("/dishes.json");

        if (!res.ok) {
          throw new Error("Could not load the dish");
        }

        const dishes = await res.json();

        const foundDish = dishes.find(
          d => Number(d.id) === Number(id)
        );

        if (!foundDish) {
          throw new Error("Dish not found");
        }

        setDish(foundDish);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    loadDish();
  }, [id]);

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>{dish.name}</h2>

      <p>Price: {dish.price} ETB</p>

      <p>Category: {dish.category}</p>

      {dish.spicy && <p>Spicy</p>}

      <Link to="/menu">Back to menu</Link>
    </div>
  );
}

export default DishDetail;