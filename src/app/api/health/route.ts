// app/api/health/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("admin"); // use admin DB for server commands
    const status = await db.command({ ping: 1 });

    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        database: "connected",
        mongoStatus: status.ok ? "ok" : "not ok",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 503 }
    );
  }
}
