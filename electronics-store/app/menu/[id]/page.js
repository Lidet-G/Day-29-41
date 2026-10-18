import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishes, getDishById } from "../data";
import AddToCartButton from "./AddToCartButton";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: dish.id }));
}

export const dynamicParams = false;

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);
  if (!dish) notFound();

  return (
    <main className="page">
      <article className="dish-detail">
        <p className="eyebrow">{dish.category}</p>
        <h1>{dish.name}</h1>
        <p>{dish.description}</p>
        <p className="price">{dish.price} ETB</p>
        <AddToCartButton dish={dish} />
        <p><Link href="/menu">← Back to menu</Link></p>
      </article>
    </main>
  );
}
