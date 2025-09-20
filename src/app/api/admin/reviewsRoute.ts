import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const payload = requireAuth(req);
  if (!payload || payload.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const body = await req.json();
  const { moderatedStatus } = body;
  
  if (!moderatedStatus || !["approved", "rejected"].includes(moderatedStatus)) {
    return NextResponse.json({ error: "Invalid moderatedStatus" }, { status: 422 });
  }
  
  await connectDB();
  const updated = await Review.findByIdAndUpdate(
    id, 
    { moderatedStatus }, 
    { new: true }
  );
  
  return NextResponse.json({ review: updated }, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const payload = requireAuth(req);
  if (!payload || payload.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  await connectDB();
  await Review.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}