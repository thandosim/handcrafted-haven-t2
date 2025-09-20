import { verifyToken } from "./jwt";
import { NextResponse } from "next/server";
import { AuthPayload } from "./types";

export function getTokenFromRequest(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? match[1] : null;
}

export function requireAuth(req: Request): AuthPayload | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  const payload = verifyToken(token);
  return payload as AuthPayload | null;
}

export function unauthorizedResponse() {
  return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
}

export function forbiddenResponse() {
  return new NextResponse(JSON.stringify({ error: "Forbidden" }), { status: 403 });
}