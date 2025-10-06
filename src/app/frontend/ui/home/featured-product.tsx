// featured-product.tsx
import { Product } from "@/app/frontend/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProduct({ product }: { product: Product }) {
  const imageUrl = product.images[0]?.url?.startsWith("http")
    ? product.images[0].url
    : "/placeholder.jpg";

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
        <div className="relative overflow-hidden">
          <Image
            src={imageUrl}
            width={1000}
            height={500}
            alt={product.images[0]?.alt || product.title}
            unoptimized
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-primary font-medium">
              {product.tags[0] || "Handmade"}
            </span>
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-xs"></i>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.ratingAvg.toFixed(1)})
              </span>
            </div>
          </div>

          <h3 className="font-bold text-gray-900 mb-2">{product.title}</h3>

          <p className="text-xs text-gray-500 mb-3">
            by {product.sellerId || "Artisan"}
          </p>

          <div className="flex items-center justify-end">
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-bold text-primary">
                ${product.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
