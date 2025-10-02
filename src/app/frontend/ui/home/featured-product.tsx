import { Product } from "@/app/frontend/lib/definitions";
import Image from "next/image";

export default function FeaturedProduct({ product }: { product: Product }) {
  const imageUrl = product.images?.[0]?.url ?? "/images/placeholder.png";

  return (
    <div className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          width={1000}
          height={500}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-primary font-medium">
            {product.category ?? "Craft"}
          </span>
          <div className="flex items-center space-x-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-xs"></i>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.ratingAvg?.toFixed(1) ?? "4.7"})
            </span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 mb-2">{product.title}</h3>

        {/* <p className="text-xs text-gray-500 mb-3">
          by Luna&apos;s Fiber Arts
        </p> */}
        <p className="text-xs text-gray-500 mb-3">
          by {product.sellerId?.name ?? "Unknown Seller"}
        </p>


        <div className="flex items-center justify-end">
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
}
