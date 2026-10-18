"use client";

import { useActionState } from "react";
import { placeOrder } from "./actions";
import { useCart } from "../cart/CartContext";

const initialState = { success: false, message: "" };

export default function CheckoutForm({ signedIn }) {
  const { cart, total, clearCart } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, initialState);

  if (cart.length === 0) {
    return <section className="panel"><p>Your cart is empty.</p><a href="/menu">Return to menu</a></section>;
  }

  const items = cart.map((item) => ({ id: item.id, quantity: item.quantity }));

  return (
    <section className="panel">
      <h2>Order summary</h2>
      {cart.map((item) => (
        <p key={item.id}>{item.name} × {item.quantity} — {item.price * item.quantity} ETB</p>
      ))}
      <h3>Total: {total} ETB</h3>
      {!signedIn && <p className="notice">You need a session cookie to place an order. This exercise does not include a sign-in page.</p>}
      <form action={formAction}>
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <button className="button" type="submit" disabled={!signedIn || pending}>
          {pending ? "Checking order..." : "Place order"}
        </button>
      </form>
      {state.message && <p role="status">{state.message}</p>}
      {state.success && <button className="text-button" onClick={clearCart}>Clear cart</button>}
    </section>
  );
}
