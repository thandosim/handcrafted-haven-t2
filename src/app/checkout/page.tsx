"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with error handling
let stripePromise: Promise<Stripe | null> | null = null;

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
} else {
  console.error("Stripe publishable key is missing");
}

// Stripe Payment Form Component
function CheckoutForm({
  clientSecret,
  onSuccess,
  onError,
}: {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // 🧹 Removed the useEffect that checked status on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setError("Payment system not ready. Please try again.");
      return;
    }

    setProcessing(true);
    setError(null);
    setMessage(null);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: "if_required",
      });

      if (stripeError) {
        const errorMsg =
          stripeError.message || "Payment failed. Please try again.";
        setError(errorMsg);
        onError(errorMsg);
      } else if (paymentIntent?.status === "succeeded") {
        setMessage("Payment successful! Processing your order...");
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else if (paymentIntent?.status === "processing") {
        setMessage("Your payment is processing.");
      } else if (paymentIntent?.status === "requires_payment_method") {
        setMessage("Your payment was not successful, please try again.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Payment failed unexpectedly";
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  if (!stripe || !elements) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">Loading payment form...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {message && (
        <div
          className={`p-3 rounded text-sm ${
            message.includes("succeeded") || message.includes("successful")
              ? "bg-green-50 text-green-700"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 border border-gray-200 rounded bg-white">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {processing ? "Processing..." : `Pay Now`}
        </button>
      </form>

      <div className="text-xs text-gray-500 text-center p-4 bg-gray-50 rounded">
        <p className="font-semibold mb-1">Test Card for Development:</p>
        <p>
          Card Number: <span className="font-mono">4242 4242 4242 4242</span>
        </p>
        <p>
          Expiry: <span className="font-mono">12/34</span> | CVV:{" "}
          <span className="font-mono">123</span>
        </p>
        <p>
          ZIP: <span className="font-mono">12345</span>
        </p>
      </div>
    </div>
  );
}

// Main Checkout Page Component
type CartItem = {
  productId: {
    _id: string;
    title: string;
    price: number;
  };
  qty: number;
};

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [intentId, setIntentId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.qty,
    0
  );

  async function handleConfirmOrder() {
    setError(null);
    setClientSecret(null);
    setIntentId(null);
    setPaymentCompleted(false);
    setSubmitting(true);

    try {
      const compactCart = cart.map((item) => ({
        productId: item.productId._id,
        title: item.productId.title,
        qty: item.qty,
        price: item.productId.price,
      }));

      if (total <= 0) {
        throw new Error("Order total must be greater than zero.");
      }

      const res = await fetch("/api/payment/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          cart: { items: compactCart },
          total,
          currency: "usd",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (!data.clientSecret) {
        throw new Error("No client secret received from server.");
      }

      setClientSecret(data.clientSecret);
      setIntentId(data.id);
    } catch (err) {
      console.error("Error confirming order:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  const handlePaymentSuccess = async () => {
    setPaymentCompleted(true);
    clearCart();
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (cart.length === 0 && !clientSecret)
    return <div className="p-massive">Your cart is empty.</div>;

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {!clientSecret ? (
        <>
          <div className="mt-8 flex-1 bg-white shadow-md rounded-lg p-medium">
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
            <p className="text-lg font-semibold mt-medium">
              Sub Total : ${total.toFixed(2)}
            </p>
            <p className="text-lg">Discount : 0</p>

            <div className="mt-8 text-right">
              <p className="text-xl  text-primary font-bold">
                Total: ${total.toFixed(2)}
              </p>
              <button
                onClick={handleConfirmOrder}
                disabled={submitting}
                className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                {submitting ? "Processing..." : "Confirm Order"}
              </button>
            </div>
          </div>
        </>
      ) : !paymentCompleted ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="space-y-3 mb-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {item.productId.title} × {item.qty}
                    </span>
                    <span>${(item.productId.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              {intentId && (
                <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
                  <p className="font-mono break-all">Payment ID: {intentId}</p>
                </div>
              )}
            </div>

            {/* Payment Form */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Payment Information
              </h2>
              {stripePromise && clientSecret ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#3B82F6",
                      },
                    },
                  }}
                >
                  <CheckoutForm
                    clientSecret={clientSecret}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </Elements>
              ) : (
                <div className="text-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">
                    Initializing payment...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              Order Confirmed!
            </h2>
            <p className="text-gray-700 mb-4">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You will receive a confirmation email shortly. Delivery should be
              expected in 3-5 business days.
            </p>
            {intentId && (
              <p className="text-xs text-gray-400 mb-6">
                Payment ID: <span className="font-mono">{intentId}</span>
              </p>
            )}
          </div>
          <div className="space-x-4">
            <a
              href="/orders"
              className="inline-block px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
            >
              View Orders
            </a>
            <a
              href="/shop"
              className="inline-block px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      )}

      {error && clientSecret && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded">
          <p className="font-semibold">Payment Error:</p>
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Dismiss
          </button>
        </div>
      )}
    </main>
  );
}
