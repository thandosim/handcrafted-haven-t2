import HeroBanner from "./frontend/ui/home/hero";
import FeaturedProduct from "./frontend/ui/home/featured-product";
import { fetchFeaturedProduct, fetchFeaturedSellers } from "./frontend/lib/api";
import { Product, Seller } from "./frontend/lib/definitions";
import SwiperSellers from "./frontend/ui/home/swiper-sellers";

export default async function Home() {
  let featuredProducts: Product[] = [];
  let featuredSellers: Seller[] = [];

  try {
    const [products, sellers] = await Promise.all([
      fetchFeaturedProduct(),
      fetchFeaturedSellers(),
    ]);

    featuredProducts = Array.isArray(products) ? products : [];
    featuredSellers = Array.isArray(sellers) ? sellers : [];
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <main>
      <HeroBanner />
      <section className="p-small md:p-massive">
        <h2 className="text-2xl text-primary text-bold mb-small font-family-lusitana font-bold">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 gap-small md:grid-cols-4">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => {
              return <FeaturedProduct product={product} key={product._id} />;
            })
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              <p>No featured products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
      <section className="p-small md:py-0 md:px-massive">
        <h2 className="text-2xl text-primary text-bold mb-small font-family-lusitana font-bold">
          Featured Sellers
        </h2>
        <div>
          {featuredSellers.length > 0 ? (
            <SwiperSellers sellers={featuredSellers} />
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>No featured sellers available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}