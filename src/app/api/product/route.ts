import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";
import { productCreateSchema } from "@/lib/validation";
import { requireAuth } from "@/lib/auth";
import slugify from "slugify";

export async function POST(req: Request) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (typeof payload !== "object" || !("role" in payload)) {
    return NextResponse.json({ error: "Invalid token payload" }, { status: 400 });
  }
  if (payload.role !== "seller") return NextResponse.json({ error: "Not a seller" }, { status: 403 });

  const body = await req.json();
  const parsed = productCreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 422 });

  await connectDB();
  const slugBase = slugify(parsed.data.title, { lower: true, strict: true }).slice(0, 100);
  let slug = slugBase;
  let i = 0;
  while (await Product.findOne({ slug })) {
    i += 1; slug = `${slugBase}-${i}`;
  }

  const product = await Product.create({
    sellerId: payload.sub,
    ...parsed.data,
    slug,
    status: "draft",
  });
  return NextResponse.json({ product }, { status: 201 });
}

export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || undefined;
  const page = Number(url.searchParams.get("page") || "1");
  const limit = Math.min(Number(url.searchParams.get("limit") || "12"), 50);
  const minPrice = Number(url.searchParams.get("minPrice") || "0");
  const maxPrice = Number(url.searchParams.get("maxPrice") || "999999");
  const tags = url.searchParams.get("tags")?.split(",") || [];
  
  const filter: any = { status: "active", price: { $gte: minPrice, $lte: maxPrice } };
  
  if (q) filter.$text = { $search: q };
  if (tags.length > 0) filter.tags = { $in: tags };

  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  
  const total = await Product.countDocuments(filter);
  return NextResponse.json({ products, page, totalPages: Math.ceil(total / limit) }, { status: 200 });
}