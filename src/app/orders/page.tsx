"use client";

type Order = {
  _id: string;
  createdAt: string;
  total: number;
  status: string;
  payment: {
    provider: string;
    status: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: {
    title: string;
    qty: number;
    price: number;
  }[];
};

const mockOrders: Order[] = [
  {
    _id: "order001",
    createdAt: "2025-10-10T14:30:00Z",
    total: 89.99,
    status: "shipped",
    payment: {
      provider: "Stripe",
      status: "succeeded",
    },
    shippingAddress: {
      street: "123 Artisan Lane",
      city: "Mbabane",
      state: "Hhohho",
      zip: "E100",
      country: "Eswatini",
    },
    items: [
      { title: "Handwoven Basket", qty: 1, price: 39.99 },
      { title: "Beaded Necklace", qty: 2, price: 25.00 },
    ],
  },
  {
    _id: "order002",
    createdAt: "2025-09-28T09:15:00Z",
    total: 120.5,
    status: "delivered",
    payment: {
      provider: "Stripe",
      status: "succeeded",
    },
    shippingAddress: {
      street: "456 Craft Ave",
      city: "Manzini",
      state: "Manzini",
      zip: "M200",
      country: "Eswatini",
    },
    items: [
      { title: "Clay Mug Set", qty: 1, price: 45.5 },
      { title: "Wooden Spoon Pack", qty: 3, price: 25.00 },
    ],
  },
];

export default function OrdersPage() {
  return (
    <main className="p-massive max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      <div className="space-y-10">
        {mockOrders.map((order) => (
          <div key={order._id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Order #{order._id}</h2>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Status: <span className="font-medium capitalize">{order.status}</span>
              </p>
              <p className="text-sm text-gray-600">
                Payment: {order.payment.provider} —{" "}
                <span className={`font-medium ${order.payment.status === "succeeded" ? "text-green-600" : "text-yellow-600"}`}>
                  {order.payment.status}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="border p-3 rounded">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                  <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-700">
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p><strong>Shipping to:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zip}, {order.shippingAddress.country}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
