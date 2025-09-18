import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const payload = requireAuth(req);
  if (
    !payload ||
    (typeof payload === "string") ||
    (payload.role !== "admin")
  )
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const body = await req.json();
  const { moderatedStatus } = body;
  
  await connectDB();
  const updated = await Review.findByIdAndUpdate(
    params.id, 
    { moderatedStatus }, 
    { new: true }
  );
  
  return NextResponse.json({ review: updated }, { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const payload = requireAuth(req);
  if (!payload || typeof payload === "string" || payload.role !== "admin") 
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  await connectDB();
  await Review.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}