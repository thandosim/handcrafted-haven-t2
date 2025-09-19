"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ArtistCard from "@/components/ArtistCard";
import { products, artists } from "@/data/mockData";


export default function HomePage() {
  const [view, setView] = useState<"products" | "artists">("products");

  return (
    <div className="min-h-screen bg-white dark:bg-[#111] text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="w-full border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Handcrafted Haven</h1>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Artists</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Account</a>
          <button aria-label="Search">🔍</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-4xl font-bold mb-4">Discover Handmade Excellence</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Crafted with care, curated for you.</p>
      </section>

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
              <ArtistCard key={a.id} name={a.name} avatarUrl={a.avatar} bio={a.bio} />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="w-full py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        &copy; 2025 Handcrafted Haven. All rights reserved.
      </footer>
    </div>
  );
}
