import { products, artists } from "@/data/mockData";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";

export default function ProductView({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#111] text-gray-900 dark:text-gray-100 font-sans">
        <Header />
        <Hero />
        <div className="p-6 text-center">Product not found.</div>
        <Footer />
      </div>
    );
  }

  const artist = artists.find((a) => a.id === product.artistId);

  return (
    <div className="min-h-screen bg-white dark:bg-[#111] text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <Hero />

      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {product.image ? (
              <img src={product.image} alt={product.title} className="h-full object-cover" />
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400">Image</span>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">R {product.price.toFixed(2)}</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This is a handcrafted item made with care and creativity. Add a custom description here later.
            </p>

            {/* Artist Info */}
            {artist && (
              <div className="mt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">Created by</p>
                <a
                  href={`/artists/${artist.id}`}
                  className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {artist.name}
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
