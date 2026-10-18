"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ productId, disabled = false, compact = false }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(productId);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  }

  return (
    <button
      className={`button button-primary ${compact ? "button-compact" : ""}`}
      type="button"
      onClick={handleAdd}
      disabled={disabled}
    >
      {disabled ? "Unavailable" : added ? "Added ✓" : compact ? "Add" : "Add to cart"}
    </button>
  );
}
