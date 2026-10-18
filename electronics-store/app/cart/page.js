
"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <main className="container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link href="/menu">Browse Menu</Link>
        </>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={item.id || index}>
              <h2>{item.name}</h2>
              <p>
                {item.quantity || 1} × {item.price} ETB
              </p>
            </div>
          ))}

          <h2>Total: {total} ETB</h2>

          <button onClick={clearCart}>Clear Cart</button>

          <p>
            <Link href="/checkout">Proceed to Checkout</Link>
          </p>
        </>
      )}
    </main>
  );
}