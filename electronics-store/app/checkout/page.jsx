"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../components/CartProvider";
import { formatPrice } from "../../lib/format";

const initialForm = { name: "", contact: "", address: "" };

export default function CheckoutPage() {
  const router = useRouter();
  const { detailedItems, subtotal, clearCart, isLoaded } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  if (!isLoaded) {
    return <main className="page-container page-section"><p>Loading checkout…</p></main>;
  }

  if (detailedItems.length === 0) {
    return (
      <main className="page-container page-section">
        <div className="empty-state">
          <h1>Your cart is empty</h1>
          <p>Add a product before submitting an order.</p>
          <Link className="button button-primary" href="/products">Browse products</Link>
        </div>
      </main>
    );
  }

  function validate() {
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Enter your full name (at least 2 characters).";
    if (!/^[+0-9()\-\s]{7,20}$/.test(form.contact.trim())) {
      nextErrors.contact = "Enter a valid phone number using 7–20 digits or phone symbols.";
    }
    if (form.address.trim().length < 8) {
      nextErrors.address = "Enter a delivery address with at least 8 characters.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    const order = {
      reference: `EH-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      customer: {
        name: form.name.trim(),
        contact: form.contact.trim(),
        address: form.address.trim(),
      },
      items: detailedItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        lineTotal: item.lineTotal,
      })),
      subtotal,
      status: "Order request submitted",
    };

    try {
      window.localStorage.setItem("electrohub_last_order", JSON.stringify(order));
      clearCart();
      router.push("/order-success");
    } catch {
      setSubmitError("We couldn't save the order in this browser. Check browser storage and try again.");
    }
  }

  return (
    <main className="page-container page-section">
      <p className="eyebrow">ONE LAST STEP</p>
      <h1 className="page-heading">Delivery information</h1>
      <p className="muted-text checkout-intro">Enter your details and review the order before submitting.</p>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h2>Customer details</h2>

          <label className="form-field">
            <span>Full name <b aria-hidden="true">*</b></span>
            <input name="name" value={form.name} onChange={handleChange} autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
            {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
          </label>

          <label className="form-field">
            <span>Phone number <b aria-hidden="true">*</b></span>
            <input name="contact" type="tel" value={form.contact} onChange={handleChange} autoComplete="tel" placeholder="+251 9…" required aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "contact-error" : undefined} />
            {errors.contact && <span className="field-error" id="contact-error">{errors.contact}</span>}
          </label>

          <label className="form-field">
            <span>Delivery address <b aria-hidden="true">*</b></span>
            <textarea name="address" value={form.address} onChange={handleChange} autoComplete="street-address" rows={4} placeholder="City, area, street or useful delivery directions" required aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? "address-error" : undefined} />
            {errors.address && <span className="field-error" id="address-error">{errors.address}</span>}
          </label>

          {submitError && <p className="field-error" role="alert">{submitError}</p>}

          <p className="small-note">This is a demonstration order form. It does not process payments or contact a real delivery service.</p>
          <button className="button button-primary button-full" type="submit">Submit order request</button>
        </form>

        <aside className="order-summary checkout-summary">
          <h2>Your order</h2>
          {detailedItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <div><strong>{item.name}</strong><span>Qty: {item.quantity}</span></div>
              <strong>{formatPrice(item.lineTotal)}</strong>
            </div>
          ))}
          <div className="summary-row summary-total"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
          <Link className="text-link" href="/cart">← Return to cart</Link>
        </aside>
      </div>
    </main>
  );
}
