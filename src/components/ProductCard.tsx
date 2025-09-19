interface ProductCardProps {
  title: string;
  imageUrl?: string;
  price?: number;
}

export default function ProductCard({ title, imageUrl, price }: ProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
      <div className="h-32 bg-gray-200 dark:bg-gray-700 mb-2 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full object-cover" />
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400">Image</span>
        )}
      </div>
      <h4 className="font-semibold">{title}</h4>
      {price !== undefined && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">R {price.toFixed(2)}</p>
      )}
    </div>
  );
}
