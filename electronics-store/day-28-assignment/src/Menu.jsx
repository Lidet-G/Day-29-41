import { useState } from "react";
import PropTypes from "prop-types";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu({ dishes }) {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const shown = category === "All"
    ? dishes
    : dishes.filter(d => d.category === category);

  function addToOrder(price) {
    setTotal(total + price);
  }

  return (
    <main className="menu-section">
      <h2>Addis Eats Menu</h2>

      <CategoryBar
        selected={category}
        onSelect={setCategory}
      />

      <p>Total: {total} ETB</p>

      <DishList
        dishes={shown}
        onAdd={addToOrder}
      />
    </main>
  );
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Menu;

