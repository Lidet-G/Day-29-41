import { dishes } from "./data";
import Menu from "./Menu";
import OrderForm from "./OrderForm";

function App() {
  return (
    <>
      <h1>Addis Eats Menu</h1>

      <Menu dishes={dishes} />

      <OrderForm />
    </>
  );
}

export default App;

