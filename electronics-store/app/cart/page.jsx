"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../components/CartProvider";
import { formatPrice } from "../../lib/format";


export default function CartPage() {
  const { detailedItems, subtotal, updateQuantity, removeFromCart, isLoaded } = useCart();

  if (!isLoaded) {
    return <main className="page-container page-section"><p>Loading your cart…</p></main>;
  }

  return (
    <main className="page-container page-section">
      <p className="eyebrow">YOUR SELECTION</p>
      <h1 className="page-heading">Shopping cart</h1>

      {detailedItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Explore the catalogue and add something useful.</p>
          <Link className="button button-primary" href="/products">Browse products</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {detailedItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <Link className="cart-item-image" href={`/products/${item.id}`}>
                  <Image src={item.image} alt={item.name} width={160} height={120} />
                </Link>
                <div className="cart-item-info">
                  <p className="product-category">{item.category}</p>
                  <h2><Link href={`/products/${item.id}`}>{item.name}</Link></h2>
                  <p className="cart-unit-price">{formatPrice(item.price)} each</p>
                  <button className="remove-button" type="button" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
                <div className="cart-item-actions">
                  <label className="quantity-control">
                    <span>Quantity</span>
                    <span className="quantity-buttons">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >−</button>
                      <output>{item.quantity}</output>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </span>
                  </label>
                  <strong className="line-total">{formatPrice(item.lineTotal)}</strong>
                </div>
              </article>
            ))}
          </div>

          <aside className="order-summary">
            <h2>Order summary</h2>
            <div className="summary-row"><span>Items</span><span>{detailedItems.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
            <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <p className="small-note">Delivery costs, if any, are not calculated in this sample project.</p>
            <Link className="button button-primary button-full" href="/checkout">Continue to checkout</Link>
            <Link className="text-link summary-back" href="/products">Continue shopping</Link>
          </aside>
        </div>
      )}
    </main>
  );
}
