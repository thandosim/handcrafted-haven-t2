// app/api/search/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";

export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  
  const query = url.searchParams.get("q") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "12"), 50);
  const minPrice = parseFloat(url.searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(url.searchParams.get("maxPrice") || "999999");
  const tags = url.searchParams.get("tags")?.split(",") || [];
  const materials = url.searchParams.get("materials")?.split(",") || [];
  
  const filter: any = { 
    status: "active", 
    price: { $gte: minPrice, $lte: maxPrice } 
  };
  
  if (query) {
    filter.$text = { $search: query };
  }
  
  if (tags.length > 0) {
    filter.tags = { $in: tags };
  }
  
  if (materials.length > 0) {
    filter.materials = { $in: materials };
  }
  
  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("sellerId", "name avatar")
    .lean();
  
  const total = await Product.countDocuments(filter);
  
  return NextResponse.json({ 
    products, 
    pagination: { 
      page, 
      limit, 
      total, 
      totalPages: Math.ceil(total / limit) 
    } 
  }, { status: 200 });
}