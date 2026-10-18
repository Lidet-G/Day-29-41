import { Link, Outlet } from "react-router-dom";
import CartBadge from "./CartBadge";

function Layout() {
  return (
    <div>
      <header>
        <h1>Addis Eats</h1>

        <nav>
          <Link to="/">Home</Link>{" "}
          <Link to="/menu">Menu</Link>{" "}
          <Link to="/checkout">
            <CartBadge />
          </Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Addis Eats</p>
      </footer>
    </div>
  );
}

export default Layout;