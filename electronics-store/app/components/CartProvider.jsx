"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../../data/products";

const CartContext = createContext(null);
const STORAGE_KEY = "electrohub_cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          const validItems = parsedCart.filter((item) => {
            return (
              products.some((product) => product.id === item.id) &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0
            );
          });
          setCartItems(validItems);
        }
      }
    } catch {
      // If saved browser data is damaged, start with an empty cart.
      setCartItems([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = useCallback((productId) => {
    const product = products.find((item) => item.id === productId);
    if (!product || !product.available) return;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === productId);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { id: productId, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId, nextQuantity) => {
    if (!Number.isInteger(nextQuantity) || nextQuantity <= 0) {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId)
      );
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: nextQuantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const detailedItems = useMemo(() => {
    return cartItems
      .map((cartItem) => {
        const product = products.find((item) => item.id === cartItem.id);
        if (!product) return null;
        return {
          ...product,
          quantity: cartItem.quantity,
          lineTotal: product.price * cartItem.quantity,
        };
      })
      .filter(Boolean);
  }, [cartItems]);

  const subtotal = detailedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const itemCount = detailedItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cartItems,
    detailedItems,
    subtotal,
    itemCount,
    isLoaded,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }
  return context;
}
