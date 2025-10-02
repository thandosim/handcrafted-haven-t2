import { Product } from "@/app/frontend/lib/definitions";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(`${process.env.BASE_URL}/api/product/${slug}`);
  if (!res.ok) return notFound();

  const { product } = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <img
        src={product.images?.[0]?.url ?? "/images/placeholder.png"}
        alt={product.title}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-lg font-semibold text-primary">${product.price}</p>
      <p className="text-sm text-gray-500 mb-2">by {product.sellerId?.name ?? "Unknown Seller"}</p>
      <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
        Add to Cart
      </button>
    </div>
  );
}

