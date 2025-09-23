import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { z } from "zod";

const cartItemSchema = z.object({
  productId: z.string(),
  qty: z.number().min(1),
});

export async function GET(req: Request) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const user = await User.findById(payload.sub).populate("cart.productId").lean();
  return NextResponse.json({ cart: user && "cart" in user ? user.cart : [] }, { status: 200 });
}

export async function POST(req: Request) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = cartItemSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.format() }, { status:422 });

  await connectDB();
  await User.updateOne(
    { _id: payload.sub },
    { $push: { cart: parsed.data } }
  );
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function DELETE(req: Request) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { productId } = body;
  
  await connectDB();
  await User.updateOne(
    { _id: payload.sub },
    { $pull: { cart: { productId } } }
  );
  return NextResponse.json({ success: true }, { status: 200 });
}