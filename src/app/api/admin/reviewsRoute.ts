import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const payload = requireAuth(req);
  if (!payload || (payload as any).role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json(); // { moderatedStatus: "approved"|"rejected" }
  await connectDB();
  const updated = await Review.findByIdAndUpdate(params.id, { moderatedStatus: body.moderatedStatus }, { new: true });
  return NextResponse.json({ review: updated }, { status: 200 });
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const payload = requireAuth(req);
  if (!payload || (payload as any).role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  await Review.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}