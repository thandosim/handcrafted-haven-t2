import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  await connectDB();
  const product = await Product.findOne({ slug, status: "active" }).lean();
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  
  return NextResponse.json({ product }, { status: 200 });
}