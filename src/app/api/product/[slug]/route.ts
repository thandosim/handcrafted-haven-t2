import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;
  await connectDB();
  const product = await Product.findOne({ slug, status: "active" })
    .populate("sellerId", "name avatar")
    .lean();
  
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product }, { status: 200 });
}