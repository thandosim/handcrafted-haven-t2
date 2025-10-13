// app/test-stripe/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function TestStripePage() {
  const [status, setStatus] = useState<string>("Checking...");

  useEffect(() => {
    const checkStripeConfig = () => {
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      
      if (!publishableKey) {
        setStatus("❌ Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
        return;
      }

      if (!publishableKey.startsWith('pk_')) {
        setStatus("❌ Invalid Stripe publishable key format");
        return;
      }

      setStatus("✅ Stripe configuration looks good!");
    };

    checkStripeConfig();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Stripe Configuration Test</h1>
      <div className="p-4 bg-gray-100 rounded">
        <p><strong>Status:</strong> {status}</p>
        <p className="mt-2 text-sm">
          <strong>Key prefix:</strong> {process.env.NEXT_PUBLIC_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 10)}...
        </p>
      </div>
    </div>
  );
}