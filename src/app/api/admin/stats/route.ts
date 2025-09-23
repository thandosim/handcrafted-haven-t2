// app/api/admin/stats/route.ts
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";
import User from "@/models/User";
import Order from "@/models/Order";
import Review from "@/models/Review";

export async function GET(req: Request) {
  const payload = requireAuth(req);
  if (!payload || payload.role !== "admin") 
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectDB();
  
  const [
    totalUsers,
    totalSellers,
    totalProducts,
    totalOrders,
    pendingReviews,
    recentOrders
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: "seller" }),
    Product.countDocuments(),
    Order.countDocuments(),
    Review.countDocuments({ moderatedStatus: "pending" }),
    Order.find().sort({ createdAt: -1 }).limit(5).populate("buyerId", "name")
  ]);
  
  return NextResponse.json({ 
    stats: {
      totalUsers,
      totalSellers,
      totalProducts,
      totalOrders,
      pendingReviews
    },
    recentOrders
  }, { status: 200 });
}