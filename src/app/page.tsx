import HeroBanner from "./ui/home/hero";
import FeaturedProduct from "./ui/home/featured-product";
import { fetchFeaturedProduct, fetchFeaturedSellers } from "./lib/api";
import { Product, Seller } from "./lib/definitions";
import SwiperSellers from "./ui/home/swiper-sellers";

export default async function Home() {
  const featuredProducts: Product[] = await fetchFeaturedProduct();
  const featuredSellers: Seller[] = await fetchFeaturedSellers();
  return (
    <main>
      <HeroBanner />
      <section className="p-small md:p-massive">
        <h2 className="text-2xl text-primary text-bold mb-small font-family-lusitana font-bold">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 gap-small md:grid-cols-4">
          {featuredProducts.map((product) => {
            return <FeaturedProduct product={product} key={product._id} />;
          })}
        </div>
      </section>
      <section className="p-small md:py-0 md:px-massive">
        <h2 className="text-2xl text-primary text-bold mb-small font-family-lusitana font-bold">
          Featured Sellers
        </h2>
        <div>
          <SwiperSellers sellers={featuredSellers} />
        </div>
      </section>
    </main>
  );
}
