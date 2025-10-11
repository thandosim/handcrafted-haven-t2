"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CartItem = {
  productId: {
    _id: string;
    title: string;
    price: number;
    images: { url: string; alt?: string }[];
  };
  qty: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch("/api/cart", { credentials: "include" });
        const contentType = res.headers.get("content-type");

        if (contentType?.includes("application/json")) {
          const data = await res.json();
          setCart(data.cart || []);
        } else {
          const text = await res.text();
          console.warn("Unexpected response:", text.slice(0, 100));
          setError("Please log in to view your cart.");
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.qty,
    0
  );

  if (loading) return <div className="p-massive">Loading cart...</div>;
  if (error) return <div className="p-massive text-red-600">{error}</div>;
  if (cart.length === 0) return <div className="p-massive">Your cart is empty.</div>;

  return (
    <main className="p-massive">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>
        <div className="space-y-6">
          {cart.map((item, i) => {
            const product = item.productId;
            const imageUrl =
              product.images[0]?.url?.startsWith("http") && product.images[0].url
                ? product.images[0].url
                : "/placeholder.jpg";

            return (
              <div key={i} className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={imageUrl}
                    alt={product.images[0]?.alt || product.title}
                    fill
                    unoptimized
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                </div>
                <div className="text-primary font-bold">${product.price * item.qty}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-right">
          <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
          <Link href="/checkout">
            <button className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
