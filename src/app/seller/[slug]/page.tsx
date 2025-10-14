"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Seller = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
};

type Product = {
  _id: string;
  title: string;
  price: number;
  image?: string;
};

export default function SellerPage() {
  const { slug } = useParams();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSellerAndProducts() {
      try {
        const res = await fetch("/api/sellers");
        const data = await res.json();
        const match = data.sellers.find((s: Seller) =>
          s.name.toLowerCase().replace(/\s+/g, "-") === slug
        );
        setSeller(match || null);

        if (match?._id) {
          const prodRes = await fetch(`/api/sellers/products?sellerId=${match._id}`);
          const prodData = await prodRes.json();
          setProducts(prodData.products || []);
        }
      } catch (err) {
        console.error("Error fetching seller or products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSellerAndProducts();
  }, [slug]);

  if (loading) return <div className="p-massive">Loading seller profile...</div>;
  if (!seller) return <div className="p-massive">Seller not found.</div>;

  const avatarUrl = seller.avatar || "/placeholder.jpg";

  return (
    <main className="p-massive max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-large">
        <div className="relative w-40 h-40 bg-accent2 flex items-center justify-center overflow-hidden">
          <Image
            src={avatarUrl}
            alt={seller.name}
            width={160}
            height={160}
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{seller.name}</h1>
          <p className="text-gray-600 mb-4">{seller.email}</p>
        </div>
      </div>

      <section className="mt-large">
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12 border border-dashed border-gray-300 rounded-lg">
              <p className="text-sm">No products found for this seller.</p>
            </div>
          ) : (
            products.map((product) => {
              const slug = product.title.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link key={product._id} href={`/product/${slug}`}>
                  <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
                    <Image
                      src={product.image || "/placeholder.jpg"}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="object-cover w-full h-48"
                    />
                    <h3 className="mt-2 font-bold text-gray-900">{product.title}</h3>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}
