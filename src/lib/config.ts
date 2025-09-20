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
    // Other storage config as required
  }
};

// Validate required environment variables
export function validateEnv() {
  const required = ['JWT_SECRET', 'MONGODB_URI'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
  
  if (config.jwtSecret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }
}

// Call at application startup
validateEnv();