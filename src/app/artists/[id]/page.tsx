import { artists, products } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";

export default function ArtistProfile({ params }: { params: { id: string } }) { //in future use async/await for the database
  const artistId = parseInt(params.id);
  const artist = artists.find((a) => a.id === artistId);
  const artistProducts = products.filter((p) => p.artistId === artistId);

  if (!artist) {
    return <div className="p-6 text-center">Artist not found.</div>;
  }

  return (
    
    <div className="min-h-screen bg-white dark:bg-[#111] text-gray-900 dark:text-gray-100 font-sans px-6 py-12">
        <Header />
        <Hero />
      {/* Artist Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mb-4">
          {artist.avatar ? (
            <img src={artist.avatar} alt={artist.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">Avatar</span>
          )}
        </div>
        <h1 className="text-3xl font-bold">{artist.name}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl">{artist.bio}</p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center gap-8 mb-12 text-center">
        <div>
          <p className="text-xl font-semibold">{artistProducts.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Products</p>
        </div>
        <div>
          <p className="text-xl font-semibold">4.8</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg Rating</p>
        </div>
        <div>
          <p className="text-xl font-semibold">2024</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
        </div>
      </div>

      {/* Product Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Products by {artist.name}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {artistProducts.map((p) => (
            <ProductCard key={p.id} title={p.title} imageUrl={p.image} price={p.price} />
          ))}
        </div>
      </section>
        <Footer />
    </div>
  );
}
