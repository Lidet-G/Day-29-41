"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function OrderStatus({ id, initial }) {
  const { data, error, isLoading } = useSWR(
    `/api/orders/${id}`,
    fetcher,
    {
      fallbackData: initial,
      refreshInterval: 5000,
    }
  );

  if (error) {
    return <p>Could not refresh the order status.</p>;
  }

  
  if (isLoading && !data) {
    return <p>Loading order...</p>;
  }

  return (
    <section className="order-card">
      <h2>Order #{data.id}</h2>

      <p>
        <strong>Customer:</strong> {data.customer}
      </p>

      <p>
        <strong>Status:</strong> {data.status}
      </p>

      <p>
        <strong>Items:</strong> {data.items.join(", ")}
      </p>

      <p>
        <strong>Total:</strong> {data.total} ETB
      </p>

      <p className="small-note">
        The order status refreshes every five seconds.
      </p>
    </section>
  );
}