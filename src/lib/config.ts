// lib/config.ts
export const config = {
  jwtSecret: process.env.JWT_SECRET!,
  mongodbUri: process.env.MONGODB_URI!,
  stripeSecret: process.env.STRIPE_SECRET_KEY!,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  nodeEnv: process.env.NODE_ENV || 'development',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  
  // Cloud storage configuration (Vercel Blob, AWS S3, etc.)
  storage: {
    provider: process.env.STORAGE_PROVIDER || 'vercel',
    // Add other storage config as needed
  }
};

// Validate required environment variables
export function validateEnv() {
  const required = ['JWT_SECRET', 'MONGODB_URI'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}