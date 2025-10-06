"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type Seller = {
  name: string;
  email: string;
  avatar?: string;
  // Add other fields like bio, badges, ratingAvg, etc. if available
};

export default function SellerPage() {
  const { slug } = useParams();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSeller() {
      try {
        const res = await fetch("/api/sellers");
        const data = await res.json();
        const match = data.sellers.find((s: Seller) =>
          s.name.toLowerCase().replace(/\s+/g, "-") === slug
        );
        setSeller(match || null);
      } catch (err) {
        console.error("Error fetching seller:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSeller();
  }, [slug]);

  if (loading) return <div className="p-massive">Loading seller profile...</div>;
  if (!seller) return <div className="p-massive">Seller not found.</div>;

  const avatarUrl = seller.avatar || "/placeholder.jpg";

  return (
    <main className="p-massive max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-large">
        <div className="relative w-40 h-40 rounded-full bg-accent2 flex items-center justify-center overflow-hidden">
            <Image
                src={avatarUrl}
                alt={seller.name}
                width={160}
                height={160}
                className="rounded-full object-cover"
            />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{seller.name}</h1>
          <p className="text-gray-600 mb-4">{seller.email}</p>
          {/* Add badges, bio, or stats here */}
        </div>
      </div>

      {/* Future: Display seller’s products here */}
      <section className="mt-large">
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Map seller’s products here once available */}
        </div>
      </section>
    </main>
  );
}
