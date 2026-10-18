"use client";

import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(dish) {
    setCart((current) => {
      const existing = current.find((item) => item.id === dish.id);
      if (existing) {
        return current.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...dish, quantity: 1 }];
    });
  }

  function removeFromCart(dishId) {
    setCart((current) => current.filter((item) => item.id !== dishId));
  }

  function changeQuantity(dishId, quantity) {
    if (quantity < 1) {
      removeFromCart(dishId);
      return;
    }
    setCart((current) =>
      current.map((item) => item.id === dishId ? { ...item, quantity } : item)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider value={{
      cart, cartCount, total, addToCart, removeFromCart, changeQuantity, clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
