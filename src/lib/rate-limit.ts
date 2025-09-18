// lib/rate-limit.ts
import { NextResponse } from 'next/server';

const rateLimitMap = new Map();

export function rateLimit(identifier: string, limit: number, windowMs: number) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Clean up old entries
  const requests = (rateLimitMap.get(identifier) || []).filter(
    (timestamp: number) => timestamp > windowStart
  );
  
  if (requests.length >= limit) {
    return false;
  }
  
  requests.push(now);
  rateLimitMap.set(identifier, requests);
  return true;
}

export function withRateLimit(handler: Function, options = { limit: 10, windowMs: 60000 }) {
  return async function (req: Request, ...args: any[]) {
    const identifier = req.headers.get('x-forwarded-for') || 'anonymous';
    
    if (!rateLimit(identifier, options.limit, options.windowMs)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
    
    return handler(req, ...args);
  };
}