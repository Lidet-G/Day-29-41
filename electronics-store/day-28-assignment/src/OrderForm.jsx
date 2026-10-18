import { useState } from "react";

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: ""
  });

  const valid = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delivery Details</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your name"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="TeleBirr number"
      />

      {form.phone && !valid && (
        <p className="err">
          Use 09… or +2519…
        </p>
      )}

      <input
        name="area"
        value={form.area}
        onChange={handleChange}
        placeholder="Delivery area"
      />

      <button disabled={!valid}>
        Pay with TeleBirr
      </button>
    </form>
  );
}

export default OrderForm;

