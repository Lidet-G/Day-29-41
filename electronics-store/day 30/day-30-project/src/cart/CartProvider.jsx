import { createContext, useMemo, useReducer } from "react";
import cartReducer from "./cartReducer";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });

  const total = state.items.reduce(
    (sum, d) => sum + d.price,
    0
  );

  const value = useMemo(() => {
    return {
      items: state.items,
      dispatch: dispatch,
      total: total
    };
  }, [state.items, total]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}