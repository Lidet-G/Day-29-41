import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <h2>Categories</h2>
        <ul>
          <li><Link href="/menu">All dishes</Link></li>
          <li><Link href="/menu?category=main">Main dishes</Link></li>
          <li><Link href="/menu?category=vegetarian">Vegetarian</Link></li>
          <li><Link href="/menu?category=drinks">Drinks</Link></li>
        </ul>
      </aside>
      <section className="menu-content">{children}</section>
    </div>
  );
}
