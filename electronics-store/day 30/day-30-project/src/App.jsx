import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Layout from "./Layout";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import Checkout from "./checkout/Checkout";
import SignIn from "./SignIn";
import RequireAuth from "./auth/RequireAuth";
import { AuthProvider } from "./auth/AuthProvider";

function Home() {
  return (
    <div>
      <h2>Welcome to Addis Eats</h2>
      <p>Find your favorite Ethiopian dishes.</p>
    </div>
  );
}
function OrderComplete() {
  return (
    <div>
      <h2>Order Complete</h2>
      <p>Your order was placed successfully.</p>
    </div>
  );
}

function NotFound() {
  return <h2>Page Not Found</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={<Home />} />

            <Route
              path="menu"
              element={<Menu />}
            />

            <Route
              path="menu/:id"
              element={<DishDetail />}
            />

            <Route
              path="signin"
              element={<SignIn />}
            />

           <Route
              path="checkout"
              element={
              <RequireAuth>
              <Checkout />
           </RequireAuth>
            }
          />

             <Route
              path="orders/:id"
           element={<OrderComplete />}
            />


            <Route
              path="*"
              element={<NotFound />}
            />

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;