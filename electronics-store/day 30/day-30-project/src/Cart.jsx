import { useContext } from "react";
import { CartContext } from "./cart/CartProvider";

function Cart() {
  const { items, dispatch, total } = useContext(CartContext);

  function removeItem(id) {
    dispatch({
      type: "remove",
      id: id
    });
  }

  function clearCart() {
    dispatch({
      type: "clear"
    });
  }

  return (
    <div>
      <h2>Cart ({items.length})</h2>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.map(item => (
        <div key={item.id}>
          <p>
            {item.name} - {item.price} ETB
          </p>

          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: {total} ETB</h3>

      <button onClick={clearCart}>
        Clear cart
      </button>
    </div>
  );
}

export default Cart;