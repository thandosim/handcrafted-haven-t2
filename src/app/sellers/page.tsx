"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Seller = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
};

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // sellers per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSellers() {
      setLoading(true);
      try {
        const res = await fetch("/api/sellers");
        const data = await res.json();
        setSellers(data.sellers || []);
      } catch (err) {
        console.error("Error fetching sellers:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSellers();
  }, []);

  const totalPages = Math.ceil(sellers.length / limit);
  const paginated = sellers.slice((page - 1) * limit, page * limit);

  return (
    <main className="p-massive max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Meet Our Sellers</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading sellers...</div>
      ) : paginated.length === 0 ? (
        <div className="text-center text-gray-500">No sellers found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginated.map((seller) => {
            const slug = seller.name.toLowerCase().replace(/\s+/g, "-");
            const avatarUrl = seller.avatar || "/placeholder.jpg";

            return (
              <Link key={seller._id} href={`/seller/${slug}`}>
                <div className="bg-white shadow-sm p-4 rounded-lg hover:shadow-md transition text-center">
                  <div className="w-24 h-24 mx-auto rounded-full bg-accent2 overflow-hidden flex items-center justify-center">
                    <Image
                      src={avatarUrl}
                      alt={seller.name}
                      width={96}
                      height={96}
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="mt-4 font-bold text-gray-900">{seller.name}</h3>
                  <p className="text-sm text-gray-500">{seller.email}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-accent2 text-gray-900 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-accent2 text-gray-900 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
