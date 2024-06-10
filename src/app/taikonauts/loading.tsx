// src/app/taikonauts/loading.tsx
export default function Loading() {
    // Custom loading skeleton component
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Loading Taikonauts NFTs by Rarity...</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="relative w-full pb-[100%]"> {/* Maintain aspect ratio */}
                <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-lg mb-4"></div> {/* Rounded corners */}
              </div>
              <div className="flex justify-between p-2">
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  