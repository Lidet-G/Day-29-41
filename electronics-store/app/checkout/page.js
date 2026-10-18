import { cookies } from "next/headers";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const signedIn = Boolean(cookieStore.get("session"));

  return (
    <main className="page">
      <h1>Checkout</h1>
      <p>Review your order before completing your purchase.</p>
      <CheckoutForm signedIn={signedIn} />
    </main>
  );
}
