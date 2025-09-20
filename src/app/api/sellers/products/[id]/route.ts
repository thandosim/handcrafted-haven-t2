// app/api/seller/products/[id]/route.ts
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";
import { z } from "zod";

const productUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
  status: z.enum(["draft", "active", "suspended"]).optional(),
});

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAuth(req);
  if (!payload || payload.role !== "seller") 
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await connectDB();
  
  const product = await Product.findOne({ _id: id, sellerId: payload.sub });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  
  return NextResponse.json({ product }, { status: 200 });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAuth(req);
  if (!payload || payload.role !== "seller") 
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const parsed = productUpdateSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.format() }, { status: 422 });

  await connectDB();
  
  // Verify the product belongs to this seller
  const product = await Product.findOne({ _id: id, sellerId: payload.sub });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  
  const updated = await Product.findByIdAndUpdate(id, parsed.data, { new: true });
  return NextResponse.json({ product: updated }, { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAuth(req);
  if (!payload || payload.role !== "seller") 
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await connectDB();
  
  // Verify the product belongs to this seller
  const product = await Product.findOne({ _id: id, sellerId: payload.sub });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
}