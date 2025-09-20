import { NextResponse } from 'next/server';

export function logRequest(req: Request, response: NextResponse, metadata: Record<string, unknown> = {}) {
  const url = new URL(req.url);
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    method: req.method,
    path: url.pathname,
    status: response.status,
    userAgent: req.headers.get('user-agent'),
    ip: req.headers.get('x-forwarded-for'),
    ...metadata
  }));
}

export function logError(error: Error, context: Record<string, unknown> = {}) {
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack,
    ...context
  }));
}