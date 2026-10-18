import Dish from "./Dish";

function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return dishes.map(dish => (
    <Dish
      key={dish.id}
      {...dish}
    />
  ));
}

export default DishList;