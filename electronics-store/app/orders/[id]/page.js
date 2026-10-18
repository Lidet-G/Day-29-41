export default async function OrderPage({ params }) {
  const { id } = await params;

  return (
    <main>
      <h1>Order Details</h1>
      <p>Order ID: {id}</p>
    </main>
  );
}
