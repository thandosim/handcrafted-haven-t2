"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/app/frontend/lib/definitions";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/product/${slug}`);
        const data = await res.json();
        if (res.ok) {
          setProduct(data.product);
        } else {
          console.error("Product not found:", data.error);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="p-massive">Loading product...</div>;
  if (!product) return <div className="p-massive">Product not found.</div>;

  const imageUrl =
    product.images[0]?.url?.startsWith("http") && product.images[0].url
      ? product.images[0].url
      : "/placeholder.jpg";

  return (
    <main className="p-massive">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-large container">
        <div className="relative w-full h-96">
          <Image
            src={imageUrl}
            alt={product.images[0]?.alt || product.title}
            fill
            unoptimized
            className="object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            by {product.sellerName || "Artisan"}
          </p>
          <div className="text-lg text-primary font-bold mb-4">
            ${product.price}
          </div>
          <p className="text-base text-gray-700 mb-6">{product.description}</p>

          <div className="flex space-x-2 mb-6">
            {product.tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 rounded text-white bg-primary hover:bg-primary-dark"
          >
            Add to Cart
          </button>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </main>
  );
}
