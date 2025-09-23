import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-08-27.basil" });
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") || "";
  const buf = await req.text();
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err: unknown) {
  const errorMessage = err instanceof Error ? err.message : "Webhook error";
  return NextResponse.json({ error: `Webhook error: ${errorMessage}` }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    await connectDB();

    const existing = await Order.findOne({ "payment.intentId": pi.id });
    if (existing) return NextResponse.json({ received: true }, { status: 200 });

    const metadata = pi.metadata || {};
    const buyerId = metadata.userId;
    const cartJson = metadata.cart ? JSON.parse(metadata.cart) : null;

    if (buyerId && cartJson && Array.isArray(cartJson.items)) {
      const order = await Order.create({
        buyerId,
        items: cartJson.items,
        total: pi.amount / 100,
        payment: {
          provider: "stripe",
          intentId: pi.id,
          status: "succeeded",
        },
        status: "processing",
      });

      // Example: Log order ID for audit trail
      console.log(`New order created: ${order._id}`);

      // // Example: Trigger post-order workflow (e.g., send confirmation email)
      // await sendOrderConfirmationEmail(order.buyerId, order._id);

      // // Example: Store order ID in a monitoring system
      // trackOrderEvent("order_created", {
      //   orderId: order._id,
      //   buyerId: order.buyerId,
      //   total: order.total,
      // });


      for (const item of cartJson.items) {
        await Product.updateOne(
          { _id: item.productId },
          { $inc: { stock: -item.qty } }
        );
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}