

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-08-27.basil" });

export async function POST(req: Request) {
  try {
    // Authenticate user
    const payload = requireAuth(req);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Parse request body
    const body = await req.json();

    // Connect to DB if needed (for price validation, etc.)
    await connectDB();

    // Validate and calculate total amount in cents
    // For production, validate items and prices server-side!
    const amountCents = Math.round((body.total || 0) * 100);
    if (amountCents <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Create Stripe payment intent
    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: body.currency || "usd",
      metadata: { userId: (payload as any).sub },
    });

    // Respond with client secret and intent ID
    return NextResponse.json(
      { clientSecret: intent.client_secret, id: intent.id },
      { status: 200 }
    );
  } catch (err: any) {
    // Handle errors
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}