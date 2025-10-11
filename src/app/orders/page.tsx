"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  productId: {
    _id: string;
    title: string;
    price: number;
    images?: { url: string; alt?: string }[];
  };
  qty: number;
};

type Order = {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders", { credentials: "include" });
        const contentType = res.headers.get("content-type");

        if (contentType?.includes("application/json")) {
          const data = await res.json();
          console.log("Fetched orders:", data);

          if (Array.isArray(data.orders)) {
            setOrders(data.orders);
          } else {
            setError(data.error || "Failed to fetch orders.");
          }
        } else {
          const text = await res.text();
          console.warn("Unexpected response:", text.slice(0, 100));
          setError("Please log in to view your orders.");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <div className="p-massive">Loading orders...</div>;
  if (error) return <div className="p-massive text-red-600">{error}</div>;
  if (orders.length === 0) return <div className="p-massive">No orders found.</div>;

  return (
    <main className="p-massive">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border-b pb-4">
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Items:</strong></p>
            <ul className="ml-4 list-disc">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.qty} × {item.productId.title} (${item.productId.price.toFixed(2)})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
