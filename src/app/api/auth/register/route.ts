import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/validation";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 422 });

  await connectDB();
  const { email, password, name } = parsed.data;
  const exists = await User.findOne({ email }).lean();
  if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash });

  const token = signToken({ sub: String(user._id), role: user.role });
  const res = NextResponse.json({ 
    user: { id: user._id, name: user.name, email: user.email, role: user.role } 
  }, { status: 201 });
  
  res.headers.set("Set-Cookie", 
    `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7*24*3600}`
  );
  return res;
}