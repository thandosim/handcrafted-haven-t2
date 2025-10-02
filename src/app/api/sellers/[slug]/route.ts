import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Seller from "@/models/Seller";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const seller = await Seller.findOne({ slug: params.slug }).lean();

    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json({ seller }, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
