// app/api/users/[id]/role/route.ts
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { z } from "zod";

const roleSchema = z.object({
  role: z.enum(["buyer", "seller", "admin"])
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const payload = requireAuth(req);
  if (!payload || payload.role !== "admin") 
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params; // Await the params Promise
  const body = await req.json();
  const parsed = roleSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.format() }, { status: 422 });

  await connectDB();
  await User.findByIdAndUpdate(id, { role: parsed.data.role });
  return NextResponse.json({ success: true }, { status: 200 });
}