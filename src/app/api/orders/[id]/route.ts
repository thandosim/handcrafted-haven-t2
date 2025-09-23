import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const order = await Order.findOne({ _id: id, buyerId: payload.sub }).lean();
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  
  return NextResponse.json({ order }, { status: 200 });
}