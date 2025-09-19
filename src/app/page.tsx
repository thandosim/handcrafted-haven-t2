"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ArtistCard from "@/components/ArtistCard";
import { products, artists } from "@/data/mockData";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";


export default function HomePage() {
  const [view, setView] = useState<"products" | "artists">("products");

  return (
    <div className="min-h-screen bg-white dark:bg-[#111] text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Toggle Button */}
      <div className="flex justify-center py-6">
        <button
          onClick={() => setView(view === "products" ? "artists" : "products")}
          className="px-6 py-2 rounded-full bg-gray-900 text-white dark:bg-gray-100 dark:text-black hover:opacity-90 transition"
        >
          View {view === "products" ? "Artists" : "Products"}
        </button>
      </div>

      {/* Conditional Section */}
      {view === "products" ? (
        <section className="py-12 px-6">
          <h3 className="text-2xl font-semibold mb-6">Featured Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} title={p.title} imageUrl={p.image} price={p.price} />
            ))}
          </div>
        </section>
      ) : (
        <section className="py-12 px-6 bg-gray-50 dark:bg-[#1a1a1a]">
          <h3 className="text-2xl font-semibold mb-6">Featured Artists</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {artists.map((a) => (
              <Link key={a.id} href={`/artists/${a.id}`} className="block hover:scale-[1.02] transition-transform">
                <ArtistCard name={a.name} avatarUrl={a.avatar} bio={a.bio} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
