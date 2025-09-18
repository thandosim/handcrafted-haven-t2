// app/api/health/route.ts
import { NextResponse } from "next/server";
import { connectDB, mongoose } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    // Check MongoDB server status
    if (!mongoose.connection.db) {
      throw new Error("MongoDB connection is not established.");
    }
    const status = await mongoose.connection.db.admin().serverStatus();

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      mongoStatus: status.ok ? "ok" : "not ok"
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error.message
    }, { status: 503 });
  }
}