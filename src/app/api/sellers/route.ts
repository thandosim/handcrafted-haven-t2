import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Seller from "@/models/Seller";
import { z } from "zod";

const sellerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  slug: z.string().min(2),
});

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function GET() {
  try {
    await connectDB();
    const sellers = await Seller.find({ role: "seller" })
      .select("name email avatar slug") // 👈 include slug
      .lean();

    return NextResponse.json({ sellers }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const payload = requireAuth(req);
    if (!payload || typeof payload === "string" || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = sellerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 422 });
    }

    await connectDB();
    const exists = await Seller.findOne({ email: parsed.data.email });
    if (exists) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const slug = generateSlug(parsed.data.name);
    const seller = await Seller.create({ ...parsed.data, slug, role: "seller" });

    return NextResponse.json({ seller }, { status: 201 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
