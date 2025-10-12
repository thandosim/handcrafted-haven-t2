"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { isLoggedIn } = useAuth();
  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.qty,
    0
  );

  if (cart.length === 0)
    return <div className="p-massive">Your cart is empty.</div>;

  return (
    <main className="p-massive">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-6">
        {cart.map((item) => {
          const imageUrl =
            item.productId.images[0]?.url?.startsWith("http") &&
            item.productId.images[0].url
              ? item.productId.images[0].url
              : "/placeholder.jpg";

          return (
            <div key={item.productId._id} className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                <Image
                  src={imageUrl}
                  alt={item.productId.images[0]?.alt || item.productId.title}
                  fill
                  unoptimized
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  {item.productId.title}
                </h2>
                <p className="text-sm text-gray-600">
                  Qty: <span className="font-bold text-lg">{item.qty}</span>
                </p>
                <div className="">
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      updateQuantity(item.productId._id, item.qty + 1)
                    }
                  >
                    <svg
                      height="30"
                      width="30"
                      fill="#15803D"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z" />
                    </svg>
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      updateQuantity(item.productId._id, item.qty - 1)
                    }
                  >
                    <svg
                      height="30"
                      width="30"
                      fill="#B91C1C"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22H14v-4h20v4z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="text-primary font-bold">
                ${item.productId.price * item.qty}
              </div>
              <div>
                <button
                  className="cursor-pointer"
                  onClick={() => removeFromCart(item.productId._id)}
                >
                  <svg
                    width="30"
                    height="30"
                    fill="#B91C1C"
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M137.051,128l75.475-75.475c2.5-2.5,2.5-6.551,0-9.051s-6.551-2.5-9.051,0L128,118.949L52.525,43.475  c-2.5-2.5-6.551-2.5-9.051,0s-2.5,6.551,0,9.051L118.949,128l-75.475,75.475c-2.5,2.5-2.5,6.551,0,9.051  c1.25,1.25,2.888,1.875,4.525,1.875s3.275-0.625,4.525-1.875L128,137.051l75.475,75.475c1.25,1.25,2.888,1.875,4.525,1.875  s3.275-0.625,4.525-1.875c2.5-2.5,2.5-6.551,0-9.051L137.051,128z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-right">
        <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
        {isLoggedIn ? (
          <Link href="/checkout">
            <button className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark">
              Proceed to Checkout
            </button>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </main>
  );
}
