interface ArtistCardProps {
  name: string;
  avatarUrl?: string;
  bio?: string;
}

export default function ArtistCard({ name, avatarUrl, bio }: ArtistCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
      <div className="h-24 w-24 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 mb-2 overflow-hidden">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">Avatar</span>
        )}
      </div>
      <h4 className="font-semibold">{name}</h4>
      {bio && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{bio}</p>
      )}
    </div>
  );
}
