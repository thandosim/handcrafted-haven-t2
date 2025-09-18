import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import Order from "@/models/Order";
import Product from "@/models/Products";
import { z } from "zod";

const reviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  text: z.string().min(10),
});

export async function POST(req: Request) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.format() }, { status:422 });

  await connectDB();
  
  // Check if user has purchased the product
  const bought = await Order.exists({ 
    buyerId: payload.sub, 
    "items.productId": parsed.data.productId,
    status: { $in: ["delivered", "shipped"] }
  });
  
  if (!bought) return NextResponse.json({ 
    error: "Only verified buyers who purchased this product can review" 
  }, { status: 403 });

  const review = await Review.create({
    productId: parsed.data.productId,
    authorId: payload.sub,
    rating: parsed.data.rating,
    text: parsed.data.text,
    isVerifiedBuyer: true,
    moderatedStatus: "pending"
  });

  // Update product rating aggregates
  const product = await Product.findById(parsed.data.productId);
  if (product) {
    product.ratingCount += 1;
    product.ratingSum += parsed.data.rating;
    product.ratingAvg = product.ratingSum / product.ratingCount;
    await product.save();
  }

  return NextResponse.json({ review }, { status: 201 });
}