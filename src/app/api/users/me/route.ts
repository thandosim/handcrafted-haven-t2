import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { requireAuth, unauthorizedResponse } from "@/lib/auth";

export async function GET(req: Request) {
  const payload = requireAuth(req);
  if (!payload) return unauthorizedResponse();
  
  await connectDB();
  const user = await User.findById(payload.sub).select("-passwordHash").lean();
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  
  return NextResponse.json({ user }, { status: 200 });
}