import PropTypes from "prop-types";
import Dish from "./Dish";

function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <div className="menu-list">
      {dishes.map(dish => (
        <Dish
          key={dish.id}
          {...dish}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default DishList;

