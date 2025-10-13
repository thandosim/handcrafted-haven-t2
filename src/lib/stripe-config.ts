// lib/stripe-config.ts
export function getStripeConfig() {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const secretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!publishableKey) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
  }
  
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }
  
  return {
    publishableKey,
    secretKey
  };
}