export const dynamic = "force-dynamic";
import HeroBanner from "./frontend/ui/home/hero";
import FeaturedProduct from "./frontend/ui/home/featured-product";
import { fetchFeaturedProduct, fetchFeaturedSellers } from "./frontend/lib/api";
import Image from "next/image";
import { Product } from "@/lib/types";

export default async function Home() {
  const featuredProducts: Product[] = await fetchFeaturedProduct();

  //console.log(featuredProducts.length);
  return (
    <main>
      <HeroBanner />
      <section className="p-small md:p-massive">
        <div className="text-center">
          <h3 className="text-2xl mb-small font-family-inter font-bold">
            Browse by Category
          </h3>
          <p className="text-sm">
            Explore our carefully curated categories of handcrafted items from
            skilled artisans worldwide.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-small mt-large justify-items-center">
          <div className="relative w-[190px] h-[190px] md:w-[290px] md:h-[290px]  rounded-lg">
            <Image
              src="/pottery-ceramics.webp"
              width={290}
              height={290}
              alt="Pottery & Ceramics"
              className="absolute z-10 rounded-lg w-full h-full object-cover"
            />
            <div className="absolute bg-gray-700 hover:opacity-30 opacity-70 left-0 top-0 z-20 w-full h-full rounded-lg transition ease-in-out"></div>
            <div className="absolute bottom-10 z-30 pl-small">
              <h4 className="font-bold text-lg text-white">
                Pottery & Ceramics
              </h4>
              <p className="text-white text-sm">203 Items</p>
            </div>
          </div>
          <div className="relative w-[190px] h-[190px] md:w-[290px] md:h-[290px] rounded-lg">
            <Image
              src="/jewelry.webp"
              width={290}
              height={290}
              alt="Jewelry"
              className="absolute z-10 rounded-lg w-full h-full object-cover"
            />
            <div className="absolute bg-gray-700 hover:opacity-30 opacity-70 left-0 top-0 z-20 w-full h-full rounded-lg transition ease-in-out"></div>
            <div className="absolute bottom-10 z-30 pl-small">
              <h4 className="font-bold text-lg text-white">Jewelry</h4>
              <p className="text-white text-sm">203 Items</p>
            </div>
          </div>
          <div className="relative w-[190px] h-[190px] md:w-[290px] md:h-[290px] rounded-lg">
            <Image
              src="/furniture.webp"
              width={290}
              height={290}
              alt="Furniture"
              className="absolute z-10 rounded-lg w-full h-full object-cover"
            />
            <div className="absolute bg-gray-700 hover:opacity-50 opacity-70 left-0 top-0 z-20 w-full h-full rounded-lg transition ease-in-out"></div>
            <div className="absolute bottom-10 z-30 pl-small">
              <h4 className="font-bold text-lg text-white">Furniture</h4>
              <p className="text-white text-sm">203 Items</p>
            </div>
          </div>
          <div className="relative w-[190px] h-[190px] md:w-[290px] md:h-[290px] rounded-lg">
            <Image
              src="/textiles.webp"
              width={290}
              height={290}
              alt="Textiles"
              className="absolute z-10 rounded-lg w-full h-full object-cover"
            />
            <div className="absolute bg-gray-700 hover:opacity-50 opacity-70 left-0 top-0 z-20 w-full h-full rounded-lg transition ease-in-out"></div>
            <div className="absolute bottom-10 z-30 pl-small">
              <h4 className="font-bold text-lg text-white">Textiles</h4>
              <p className="text-white text-sm">203 Items</p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-small md:px-massive">
        <div className="text-center">
          <h3 className="text-2xl mb-small font-family-inter font-bold">
            Featured Products
          </h3>
          <p className="text-sm">
            Handpicked favorites from our community of artisans
          </p>
        </div>
        <div className="grid grid-cols-1 gap-small md:grid-cols-4 mt-large">
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
      <section className="p-small md:px-massive bg-surface mt-medium py-massive">
        <div className="text-center py-large">
          <h3 className="text-2xl mb-small font-family-inter font-bold">
            Why Choose Handcrafted Haven?
          </h3>
          <p className="text-sm">
            We're more than just a marketplace - we're a community that
            celebrates craftsmanship and creativity.
          </p>
        </div>
        <div className="flex flex-col items-center md:flex-row md:gap-large justify-evenly">
          <div className="flex flex-col justify-center items-center text-center md:w-100">
            <div className="w-20 h-20 rounded-full bg-primary/40 flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-primary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 7h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C10.4 2.842 8.949 2 7.5 2A3.5 3.5 0 0 0 4 5.5c.003.52.123 1.033.351 1.5H4a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2Zm-9.942 0H7.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM13 14h-2v8h2v-8Zm-4 0H4v6a2 2 0 0 0 2 2h3v-8Zm6 0v8h3a2 2 0 0 0 2-2v-6h-5Z" />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2">Unique Products</h4>
            <p className="text-sm text-gray-600">
              Every item is handcrafted and one-of-a-kind, ensuring you own
              something truly special.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center text-center md:w-100">
            <div className="w-20 h-20 rounded-full bg-green-800/40 flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-green-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a7 7 0 0 0-7 7 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V9a5 5 0 1 1 10 0v7.083A2.919 2.919 0 0 1 14.083 19H14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 1.732-1h.351a4.917 4.917 0 0 0 4.83-4H19a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3 7 7 0 0 0-7-7Zm1.45 3.275a4 4 0 0 0-4.352.976 1 1 0 0 0 1.452 1.376 2.001 2.001 0 0 1 2.836-.067 1 1 0 1 0 1.386-1.442 4 4 0 0 0-1.321-.843Z" />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2">Support Artisans</h4>
            <p className="text-sm text-gray-600">
              Your purchase directly supports independent creators and helps
              preserve traditional crafts.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center text-center md:w-100">
            <div className="w-20 h-20 rounded-full bg-secondary/40 flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-secondary"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                <path d="M9.896 3.051a2.681 2.681 0 0 1 4.208 0c.147.186.38.282.615.255a2.681 2.681 0 0 1 2.976 2.975.681.681 0 0 0 .254.615 2.681 2.681 0 0 1 0 4.208.682.682 0 0 0-.254.615 2.681 2.681 0 0 1-2.976 2.976.681.681 0 0 0-.615.254 2.682 2.682 0 0 1-4.208 0 .681.681 0 0 0-.614-.255 2.681 2.681 0 0 1-2.976-2.975.681.681 0 0 0-.255-.615 2.681 2.681 0 0 1 0-4.208.681.681 0 0 0 .255-.615 2.681 2.681 0 0 1 2.976-2.975.681.681 0 0 0 .614-.255ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                <path d="M5.395 15.055 4.07 19a1 1 0 0 0 1.264 1.267l1.95-.65 1.144 1.707A1 1 0 0 0 10.2 21.1l1.12-3.18a4.641 4.641 0 0 1-2.515-1.208 4.667 4.667 0 0 1-3.411-1.656Zm7.269 2.867 1.12 3.177a1 1 0 0 0 1.773.224l1.144-1.707 1.95.65A1 1 0 0 0 19.915 19l-1.32-3.93a4.667 4.667 0 0 1-3.4 1.642 4.643 4.643 0 0 1-2.53 1.21Z" />
              </svg>
            </div>
            <h4 className="font-bold text-lg mb-2">Quality Guaranteed</h4>
            <p className="text-sm text-gray-600">
              We carefully vet all artisans and products to ensure the highest
              quality standards.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
