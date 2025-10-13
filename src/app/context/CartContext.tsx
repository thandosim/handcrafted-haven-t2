"use client";

import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";

import { alertMessage, getLocalStorage, setLocalStorage } from "../utils";
import { CartItem } from "@/lib/types";
import { Product } from "../frontend/lib/definitions";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  //Load cart from localstorage on mount
  useEffect(() => {
    const products = getLocalStorage<CartItem[]>("cart", []);
    setCart(products);
  }, []);

  const addToCart = (product: Product) => {
    const newCart = [...cart];
    let index = newCart.findIndex((cart) => cart.productId._id === product._id);
    if (index !== -1) {
      newCart[index].qty + 1;
    } else {
      newCart.push({
        productId: {
          _id: product._id,
          title: product.title,
          price: product.price,
          images: product.images,
        },
        qty: 1, // Initial quantity for new product
      });
    }
    setCart(newCart);
    setLocalStorage("cart", newCart);
    alertMessage("item is successfully added");
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((cart) => cart.productId._id !== productId);
    setCart(newCart);
    setLocalStorage("cart", newCart);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setCart((oldCart) => {
      return oldCart.map((cart) =>
        cart.productId._id === id
          ? {
              ...cart,
              qty: newQuantity > 1 ? newQuantity : 1,
            }
          : cart
      );
    });
    setLocalStorage("cart", cart);
  };

  const clearCart = () => {
    setCart([]);
    setLocalStorage("cart", []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
