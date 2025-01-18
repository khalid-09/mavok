import { Skeleton } from "@/components/ui/skeleton";

export default function AccessoriesSkeleton() {
  return (
    <div className="w-full">
      {/* Skeleton for the tabs */}
      <div className="flex items-center justify-center border-b border-primaryBorder p-4 sm:px-30 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex h-[9.25rem] w-[6.625rem] flex-col justify-between rounded-lg px-3 pb-[1.125rem] pt-3.5 sm:w-[7.75rem]"
            >
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton for products grid */}
      <div className="bg-secondaryLight p-4 pb-10 xl:px-30 xl:py-16">
        <div className="content space-y-4 md:space-y-6">
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
