import { Seller } from "@/app/frontend/lib/definitions";

export default function CardFeaturedSeller({ seller }: { seller: Seller }) {
  return (
    <>
      <div className="max-w-3xl mx-auto shadow-sm bg-white overflow-hidden border-1 border-gray-200 md:flex">
        <div className="overflow-hidden bg-accent2 py-small md:flex md:flex-1 md:items-center md:justify-center">
          <img
            src={seller.imageUrl}
            alt={seller.displayName}
            className="w-32 h-32 object-cover border-4 border-white shadow-lg mx-auto md:mx-0"
          />
        </div>

        <div className="flex-2 p-6 pt-4">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {seller.displayName}
            </h3>
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="flex text-yellow-400">
                <i className="fas fa-star text-sm"></i>
                <i className="fas fa-star text-sm"></i>
                <i className="fas fa-star text-sm"></i>
                <i className="fas fa-star text-sm"></i>
                <i className="fas fa-star text-sm"></i>
              </div>
              <span className="text-sm text-gray-600 font-medium">4.8</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">127 reviews</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {seller.badges.map((badge) => {
              return (
                <span
                  className="bg-accent2 text-gray-900 text-xs font-medium px-3 py-1 rounded-full"
                  key={badge}
                >
                  {badge}
                </span>
              );
            })}
          </div>

          <p className="text-gray-600 text-sm text-justify mb-6 leading-relaxed">
            Creating beautiful macrame and fiber art pieces that bring natural
            beauty into your home. Each piece is handcrafted with sustainable
            materials and lots of love.
          </p>
        </div>
      </div>
    </>
  );
}
