import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Field from "./Field";
import { validate } from "./validate";
import { placeOrder } from "../api/Orders";
import { useCartStore } from "../cart/cartStore";

function Checkout() {
  const navigate = useNavigate();

  const total = useCartStore(
    (s) =>
      s.items.reduce(
        (sum, dish) => sum + dish.price,
        0
      )
  );

  const clear = useCartStore(
    (s) => s.clear
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: ""
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverErrors, setServerErrors] = useState({});

  const errors = validate(form);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value
    }));

    setServerErrors((errors) => ({
      ...errors,
      [name]: ""
    }));

    setServerError("");
  }

  function handleBlur(e) {
    const { name } = e.target;

    setTouched((t) => ({
      ...t,
      [name]: true
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (submitting) {
      return;
    }

    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true
    });

    if (Object.keys(errors).length > 0) {
      const firstError = Object.keys(errors)[0];

      document
        .getElementById(firstError)
        ?.focus();

      return;
    }

    setSubmitting(true);
    setServerError("");
    setServerErrors({});

    try {
      const order = await placeOrder(form);

      clear();

      navigate(`/orders/${order.id}`, {
        replace: true
      });
    } catch (e) {
      if (e.status === 422) {
        setServerErrors(e.fieldErrors);

        const firstError =
          Object.keys(e.fieldErrors)[0];

        document
          .getElementById(firstError)
          ?.focus();
      } else {
        setServerError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  }

  function showError(name) {
    return (
      (touched[name] && errors[name]) ||
      serverErrors[name]
    );
  }

  return (
    <div>
      <h2>Checkout</h2>

      {serverError && (
        <p role="alert">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <Field
          label="Name"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("name")}
        />

        <Field
          label="TeleBirr number"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("phone")}
        />

        <Field
          label="Delivery area"
          id="area"
          name="area"
          value={form.area}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("area")}
        >
          <select
            id="area"
            name="area"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!showError("area")}
            aria-describedby={
              showError("area")
                ? "area-error"
                : undefined
            }
          >
            <option value="Bole">Bole</option>
            <option value="Kazanchis">
              Kazanchis
            </option>
            <option value="Megenagna">
              Megenagna
            </option>
            <option value="Piassa">
              Piassa
            </option>
          </select>
        </Field>

        <Field
          label="Notes (optional)"
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("notes")}
        >
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!showError("notes")}
            aria-describedby={
              showError("notes")
                ? "notes-error"
                : undefined
            }
          />
        </Field>

        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "Sending your order..."
            : `Order — ${total} ETB`}
        </button>
      </form>
    </div>
  );
}

export default Checkout;