"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroBanner from "../frontend/ui/home/hero";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Product = {
  _id: string;
  title: string;
  price: number;
  slug: string;
  sellerName: string; // Added field for seller's name
  images: { url: string; alt?: string }[];
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`/api/product?page=${page}&limit=9`);
        const data = await res.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page]);

  return (
    <main>
      <HeroBanner />
      <section className="p-small md:p-massive">
        <div className="text-center">
          <h3 className="text-2xl mb-small font-family-inter font-bold">
            Meet Our Sellers
          </h3>
          <p className="text-sm">
            Explore our carefully curated categories of handcrafted items from
            skilled artisans worldwide.
          </p>
        </div>
        <div>
          {loading ? (
            <div className="text-center text-gray-500">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-small md:pt-massive">
              {products.map((product) => (
                <Link key={product._id} href={`/product/${product.slug}`}>
                  <div className="bg-white shadow-sm p-4 rounded-lg hover:shadow-md transition">
                    <Image
                      src={product.images[0]?.url || "/placeholder.jpg"}
                      alt={product.images[0]?.alt || product.title}
                      width={300}
                      height={200}
                      unoptimized={true} // Temporary fix for image optimization issues
                      className="w-full h-40 object-cover rounded"
                    />
                    <h3 className="mt-2 font-bold text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      by {product.sellerName || "Artisan"}
                    </p>
                    <p className="text-primary font-semibold">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 my-10">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-2 py-4 bg-gray-100 rounded disabled:opacity-50"
        >
          <ChevronLeftIcon className="size-6 text-bold text-primary" />
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-2 py-4 bg-gray-100 rounded disabled:opacity-50"
        >
          <ChevronRightIcon className="size-6 text-bold text-primary" />
        </button>
      </div>
    </main>
  );
}
