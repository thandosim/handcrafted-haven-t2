"use client";

import { useEffect, useState } from "react";

type CartItem = {
  productId: {
    _id: string;
    title: string;
    price: number;
  };
  qty: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [intentId, setIntentId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

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
          setError("Please log in to proceed with checkout.");
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

  async function handleConfirmOrder() {
    setSubmitting(true);
    setError(null);

    try {
      const compactCart = cart.map((item) => ({
        id: item.productId._id,
        title: item.productId.title,
        qty: item.qty,
      }));

      const res = await fetch("/api/payment/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          cart: compactCart,
          total,
          currency: "usd",
        }),
      });

      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const data = await res.json();
        if (res.ok) {
          setClientSecret(data.clientSecret);
          setIntentId(data.id);
          setShowPaymentForm(true);
        } else {
          setError(data.error || "Failed to create payment intent.");
        }
      } else {
        const text = await res.text();
        console.warn("Unexpected response:", text.slice(0, 100));
        setError("Unexpected server response. Please try again.");
      }
    } catch (err) {
      console.error("Error confirming order:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handlePaymentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Simulate payment success
    setPaymentCompleted(true);
    setCart([]);
  }

  if (loading) return <div className="p-massive">Loading checkout...</div>;
  if (error) return <div className="p-massive text-red-600">{error}</div>;
  if (cart.length === 0 && !clientSecret)
    return <div className="p-massive">Your cart is empty.</div>;

  return (
    <main className="p-massive">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {!clientSecret ? (
        <>
          <div className="space-y-4">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.productId.title}</p>
                  <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                </div>
                <div className="text-primary font-bold">
                  ${item.productId.price * item.qty}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleConfirmOrder}
              disabled={submitting}
              className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            >
              {submitting ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </>
      ) : !paymentCompleted ? (
        <form
          className="mt-6 space-y-4 max-w-md mx-auto"
          onSubmit={handlePaymentSubmit}
        >
          <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
          <p className="text-sm text-gray-600 mb-4">
            Payment Intent ID: <span className="font-mono">{intentId}</span>
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Expiry
              </label>
              <input
                type="text"
                name="expiry"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                placeholder="123"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit Payment
          </button>
        </form>
      ) : (
        <div className="mt-12 text-center space-y-6">
          <h2 className="text-2xl font-semibold text-green-700">
            Order Confirmed!
          </h2>
          <p className="text-gray-700 text-lg">
            Thank you for your purchase. Your order has been placed and delivery
            should be expected in a few days.
          </p>
          <p className="text-sm text-gray-500 italic">
            Payment Intent ID: <span className="font-mono">{intentId}</span>
          </p>
          <a
            href="/shop"
            className="inline-block px-6 py-2 bg-accent2 text-white rounded hover:bg-accent2-dark transition"
          >
            Continue Shopping
          </a>
        </div>
      )}
    </main>
  );
}
