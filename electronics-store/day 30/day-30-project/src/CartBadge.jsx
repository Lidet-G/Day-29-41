import { useCartStore } from "./cart/cartStore";

function CartBadge() {
  const count = useCartStore(
    (s) => s.items.length
  );

  return (
    <span>
      Cart ({count})
    </span>
  );
}

export default CartBadge;