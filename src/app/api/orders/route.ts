import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { z } from "zod";

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    qty: z.number().min(1),
  })),
  total: z.number().min(0),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string()
  })
});

export async function GET(req: Request) {
  try {
    const payload = requireAuth(req);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const orders = await Order.find({ buyerId: payload.sub })
      .populate("items.productId", "title images")
      .lean();
    
    return NextResponse.json({ orders }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const payload = requireAuth(req);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = orderSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 422 });

    await connectDB();
    const order = await Order.create({
      buyerId: payload.sub,
      items: parsed.data.items,
      total: parsed.data.total,
      shippingAddress: parsed.data.shippingAddress,
      payment: { provider: "manual", status: "pending" },
    });
    
    return NextResponse.json({ order }, { status: 201 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
