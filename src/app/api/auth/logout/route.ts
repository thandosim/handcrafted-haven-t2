// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() { 
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.headers.set("Set-Cookie", "token=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
  return response;
}