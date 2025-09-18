import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { z } from "zod";

const sellerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function GET(req: Request) {
  try {
    await connectDB();
    const sellers = await User.find({ role: "seller" }).lean();
    return NextResponse.json({ sellers }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const payload = requireAuth(req);
    if (!payload || (typeof payload === "string" || payload.role !== "admin"))
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const parsed = sellerSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 422 });

    await connectDB();
    const exists = await User.findOne({ email: parsed.data.email });
    if (exists) return NextResponse.json({ error: "Email already exists" }, { status: 409 });

    const seller = await User.create({ ...parsed.data, role: "seller" });
    return NextResponse.json({ seller }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}