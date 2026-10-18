import { Link } from "react-router-dom";
import { useCartStore } from "./cart/cartStore";

function Dish({
  id,
  name,
  price,
  category,
  spicy
}) {
  const addItem = useCartStore(
    (s) => s.addItem
  );

  const dish = {
    id,
    name,
    price,
    category,
    spicy
  };

  return (
    <div>
      <h3>
        <Link to={`/menu/${id}`}>
          {name}
        </Link>
      </h3>

      <p>{price} ETB</p>

      <p>{category}</p>

      {spicy && <p>Spicy</p>}

      <button onClick={() => addItem(dish)}>
        Add to cart
      </button>
    </div>
  );
}

export default Dish;