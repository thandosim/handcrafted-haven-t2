import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  await connectDB();
  // UPDATED: Populate seller name
  const product = await Product.findOne({ slug, status: "active" })
    .populate("sellerId", "name")
    .lean<{ sellerId?: { name?: string } }>();
    
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  
  // Transform the data to include sellerName
  const transformedProduct = {
    ...product,
    sellerName: product.sellerId?.name || "Artisan"
  };
  
  return NextResponse.json({ product: transformedProduct }, { status: 200 });
}