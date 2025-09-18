import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2),
  price: z.number().min(0),
  stock: z.number().min(0),
  description: z.string().optional(),
});

export async function POST(req: Request) {
  const payload = requireAuth(req);
  if (
    !payload ||
    typeof payload === "string" ||
    !["admin", "seller"].includes((payload as any).role)
  )
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.format() }, { status:422 });

  await connectDB();
  const product = await Product.create({ ...parsed.data, sellerId: payload.sub });
  return NextResponse.json({ product }, { status: 201 });
}