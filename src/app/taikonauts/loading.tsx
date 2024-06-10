// src/app/taikonauts/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // Custom loading skeleton component
  return (
    <div className="container mx-auto p-4">
      <div className="animate-pulse">
        <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
        <div className="my-4">
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="my-4">
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="relative w-full pb-[100%]">
              <Skeleton className="absolute top-0 left-0 w-full h-full rounded-lg" />
            </div>
            <div className="flex justify-between p-2">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
