"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroBanner from "../frontend/ui/home/hero";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

type Seller = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
};

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
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
            <div className="text-center text-gray-500">Loading sellers...</div>
          ) : paginated.length === 0 ? (
            <div className="text-center text-gray-500">No sellers found.</div>
          ) : (
            <div className="grid grid-cols-1 gap-small md:grid-cols-4 mt-large">
              {paginated.map((seller) => {
                const slug = seller.name.toLowerCase().replace(/\s+/g, "-");
                const avatarUrl = seller.avatar || "/avatar.webp";

                return (
                  <Link key={seller._id} href={`/seller/${slug}`}>
                    <div className="bg-white shadow-sm p-4 rounded-lg hover:shadow-md transition text-center">
                      <div className="mx-auto w-[200px] h-[200px] border border-gray-300 overflow-hidden">
                        <Image
                          src={avatarUrl}
                          alt={seller.name}
                          width={200}
                          height={200}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="mt-4 font-bold text-gray-900">
                        {seller.name}
                      </h3>
                      <p className="text-sm text-gray-500">{seller.email}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

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
