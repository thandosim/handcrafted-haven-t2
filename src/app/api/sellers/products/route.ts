// app/api/seller/products/route.ts
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";
import { z } from "zod";

const productUpdateSchema = z.object({
  id: z.string().min(1), // Add ID to the schema since we'll get it from body
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
  status: z.enum(["draft", "active", "suspended"]).optional(),
});

export async function GET(req: Request) {
  const payload = requireAuth(req);
  if (!payload || payload.role !== "seller") 
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectDB();
  const products = await Product.find({ sellerId: payload.sub });
  return NextResponse.json({ products }, { status: 200 });
}

export async function PATCH(req: Request) {
  const payload = requireAuth(req);
  if (!payload || payload.role !== "seller") 
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = productUpdateSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.format() }, { status: 422 });

  await connectDB();
  
  // Verify the product belongs to this seller
  const product = await Product.findOne({ _id: parsed.data.id, sellerId: payload.sub });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  
  // Remove id from data before updating
  const { id, ...updateData } = parsed.data;
  const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
  return NextResponse.json({ product: updated }, { status: 200 });
}