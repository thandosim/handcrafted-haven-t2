import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import Order from "@/models/Order";
import Product from "@/models/Products";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const rating = Number(body.rating || 0);
  const text = body.text || "";

  await connectDB();
  // verified buyer check
  const bought = await Order.exists({ buyerId: (payload as any).sub, "items.productId": params.id });
  if (!bought) return NextResponse.json({ error: "Only verified buyers can review" }, { status: 403 });

  const review = await Review.create({
    productId: params.id,
    authorId: (payload as any).sub,
    rating,
    text,
    isVerifiedBuyer: true,
    moderatedStatus: "approved"
  });

  // atomically update rating aggregates
  await Product.updateOne({ _id: params.id }, {
    $inc: { ratingSum: rating, ratingCount: 1 },
    $set: { ratingAvg: { $divide: ["$ratingSum", "$ratingCount"] } } // note: atomic avg via aggregation would be better
  });

  return NextResponse.json({ review }, { status: 201 });
}
