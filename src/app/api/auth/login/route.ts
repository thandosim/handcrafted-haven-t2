import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { loginSchema } from "@/lib/validation";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.format() }, { status: 422 });

  await connectDB();
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const ok = await bcrypt.compare(password, user.passwordHash || "");
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signToken({ sub: String(user._id), role: user.role });
  const res = NextResponse.json({ 
    user: { id: user._id, name: user.name, email: user.email, role: user.role } 
  }, { status: 200 });
  
  res.headers.set("Set-Cookie", 
    `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7*24*3600}`
  );
  return res;
}