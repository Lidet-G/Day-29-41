"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "../../lib/format";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedOrder = window.localStorage.getItem("electrohub_last_order");
      if (savedOrder) setOrder(JSON.parse(savedOrder));
    } catch {
      setOrder(null);
    } finally {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return <main className="page-container page-section"><p>Loading order confirmation…</p></main>;
  }

  if (!order) {
    return (
      <main className="page-container page-section">
        <div className="empty-state">
          <h1>No recent order found</h1>
          <p>Submit an order from the checkout page to see a confirmation here.</p>
          <Link className="button button-primary" href="/products">Browse products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container page-section">
      <section className="success-card">
        <div className="success-mark" aria-hidden="true">✓</div>
        <p className="eyebrow">ORDER REQUEST RECEIVED</p>
        <h1>Thank you, {order.customer.name}.</h1>
        <p className="muted-text">Your demonstration order has been saved in this browser.</p>
        <div className="reference-box">
          <span>Order reference</span>
          <strong>{order.reference}</strong>
        </div>

        <div className="confirmation-details">
          <h2>Delivery details</h2>
          <p><strong>Contact:</strong> {order.customer.contact}</p>
          <p><strong>Address:</strong> {order.customer.address}</p>
        </div>

        <div className="confirmation-details">
          <h2>Order summary</h2>
          {order.items.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>{item.name} × {item.quantity}</span>
              <strong>{formatPrice(item.lineTotal)}</strong>
            </div>
          ))}
          <div className="summary-row summary-total">
            <span>Subtotal</span>
            <strong>{formatPrice(order.subtotal)}</strong>
          </div>
        </div>

        <p className="small-note">No payment was taken. This student project does not send orders to a real business.</p>
        <Link className="button button-primary" href="/products">Continue shopping</Link>
      </section>
    </main>
  );
}
