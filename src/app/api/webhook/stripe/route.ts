// app/api/webhooks/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Products";
import User from "@/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

interface CartItem {
  productId: string;
  qty: number;
  addedAt?: string;
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") || "";
  const body = await req.text();

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${errorMessage}` },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;

      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentFailed(failedPaymentIntent);
        break;

      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  // Check if order already exists
  const existingOrder = await Order.findOne({ 
    "payment.intentId": paymentIntent.id 
  });
  
  if (existingOrder) {
    console.log(`Order already exists for payment intent: ${paymentIntent.id}`);
    return;
  }

  const { userId, cart } = paymentIntent.metadata || {};
  
  if (!userId) {
    console.error("No userId found in payment intent metadata");
    return;
  }

  let cartItems: CartItem[] = [];
  
  try {
    cartItems = cart ? JSON.parse(cart).items as CartItem[] : [];
  } catch (parseError) {
    console.error("Failed to parse cart metadata:", parseError);
    return;
  }
  
  try {
    cartItems = cart ? JSON.parse(cart).items : [];
  } catch (parseError) {
    console.error("Failed to parse cart metadata:", parseError);
    return;
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    console.error("Invalid or empty cart items");
    return;
  }

  // Create order
  const order = await Order.create({
    buyerId: userId,
    items: cartItems,
    total: paymentIntent.amount / 100,
    payment: {
      provider: "stripe",
      intentId: paymentIntent.id,
      status: "succeeded",
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    },
    status: "processing",
    createdAt: new Date(),
  });

  // Update product stock
  for (const item of cartItems) {
    await Product.updateOne(
      { _id: item.productId },
      { $inc: { stock: -item.qty } }
    );
  }

  // Clear user's cart
  await User.updateOne(
    { _id: userId },
    { $set: { cart: [] } }
  );

  console.log(`Order created successfully: ${order._id}`);
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.error(`Payment failed for intent: ${paymentIntent.id}`);
  
  // You might want to update order status or send notification
  await Order.updateOne(
    { "payment.intentId": paymentIntent.id },
    { 
      $set: { 
        "payment.status": "failed",
        status: "failed"
      } 
    }
  );
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  // Handle Stripe Checkout session completion if needed
  console.log(`Checkout session completed: ${session.id}`);
}