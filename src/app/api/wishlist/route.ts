// app/api/wishlist/route.ts
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { productId } = await req.json();
  await connectDB();
  
  await User.findByIdAndUpdate(
    payload.sub,
    { $addToSet: { wishlist: productId } }
  );
  
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const payload = requireAuth(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { productId } = await req.json();
  await connectDB();
  
  await User.findByIdAndUpdate(
    payload.sub,
    { $pull: { wishlist: productId } }
  );
  
  return NextResponse.json({ success: true });
}