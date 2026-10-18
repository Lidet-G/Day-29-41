import Link from "next/link";
import { getDishes } from "./menu/data";
import DishCard from "./menu/DishCard";

export const revalidate = 60;

export default async function HomePage() {
  const dishes = await getDishes();
  const specials = dishes.filter((dish) => ["kitfo", "shiro", "doro-wot"].includes(dish.id));

  return (
    <main className="page home-page">
      <section className="hero">
        <p className="eyebrow">A taste of Ethiopia</p>
        <h1>Welcome to Addis Eats</h1>
        <p>Discover traditional Ethiopian favourites, freshly prepared and ready to enjoy.</p>
        <Link className="button" href="/menu">Explore our menu</Link>
      </section>
      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">Made for you</p><h2>Today’s specials</h2></div>
          <Link href="/menu">View all dishes →</Link>
        </div>
        <div className="dish-grid">
          {specials.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      </section>
    </main>
  );
}
