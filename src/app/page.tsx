import HeroBanner from "./frontend/ui/home/hero";
import FeaturedProduct from "./frontend/ui/home/featured-product";
import { fetchFeaturedProduct, fetchFeaturedSellers } from "./frontend/lib/api";
import { Product, Seller } from "./frontend/lib/definitions";
import SwiperSellers from "./frontend/ui/home/swiper-sellers";
import Link from "next/link";

export default async function Home() {
  let featuredProducts: Product[] = await fetchFeaturedProduct();
  let featuredSellers: Seller[] = await fetchFeaturedSellers();
  let deb = await fetchFeaturedSellers();
  console.log("featuredSellers : ", deb);
  //console.log(featuredProducts.length);
  return (
    <main>
      <HeroBanner />
      <section className="p-small md:p-massive">
        <h2 className="text-2xl text-primary text-bold mb-small font-family-lusitana font-bold">
          Featured Productss
        </h2>
        <div className="grid grid-cols-1 gap-small md:grid-cols-4">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <Link
                href={`/product/${product.slug}`}
                key={product._id}
                className="block hover:shadow-md transition-shadow duration-200"
              >
                <FeaturedProduct product={product} />
              </Link>
            ))
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
