"use client";

import Link from "next/link";
import { useCart } from "../cart/CartContext";

export default function DishCard({ dish }) {
  const { addToCart } = useCart();

  return (
    <article className="dish-card">
      <p className="dish-category">{dish.category}</p>
      <h3>{dish.name}</h3>
      <p>{dish.description}</p>
      <p className="price">{dish.price} ETB</p>
      <div className="card-actions">
        <Link href={`/menu/${dish.id}`}>View details</Link>
        <button className="button button-small" type="button" onClick={() => addToCart(dish)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
