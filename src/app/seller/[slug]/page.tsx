import { Seller } from "@/app/frontend/lib/definitions";
import { Product } from "@/app/frontend/lib/definitions";
import { notFound } from "next/navigation";

export default async function SellerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${process.env.BASE_URL}/api/seller/${slug}`);
  if (!res.ok) return notFound();

  const { seller } = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={seller.avatar ?? "/images/default-avatar.png"}
          alt={seller.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{seller.name}</h1>
          <p className="text-gray-500">{seller.email}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Products by {seller.name}</h2>
      {/* Optional: Fetch and display seller's products here */}
    </div>
  );
}
