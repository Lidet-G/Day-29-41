"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function SiteHeader() {
  const { itemCount, isLoaded } = useCart();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="ElectroHub home">
        <span className="brand-icon">E</span>
        ElectroHub
      </Link>

      <nav className="navigation" aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart" className="cart-nav-link">
          Cart
          <span className="cart-count" aria-label={`${itemCount} items in cart`}>
            {isLoaded ? itemCount : "…"}
          </span>
        </Link>
      </nav>
    </header>
  );
}
