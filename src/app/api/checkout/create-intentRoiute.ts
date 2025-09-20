import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-08-27.basil" });

export async function POST(req: Request) {
  try {
    const payload = requireAuth(req);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await connectDB();

    const amountCents = Math.round((body.total || 0) * 100);
    if (amountCents <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: body.currency || "usd",
      metadata: { userId: payload.sub },
    });

    return NextResponse.json(
      { clientSecret: intent.client_secret, id: intent.id },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}