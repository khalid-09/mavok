import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Loading() {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="flex items-center justify-center rounded-none border-b border-primaryBorder p-4 sm:px-30 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {[...Array(3)].map((_, index) => (
            <TabsTrigger
              key={index}
              value={`tab-${index}`}
              className="flex h-[9.25rem] w-[6.625rem] flex-col justify-between rounded-lg px-3 pb-[1.125rem] pt-3.5 sm:w-[7.75rem]"
            >
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-4 w-full" />
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      <div className="bg-secondaryLight p-4 pb-10 xl:px-30 xl:py-16">
        <div className="content space-y-4 md:space-y-6">
          <div className="flex w-full items-center justify-between">
            <Skeleton className="h-8 w-40" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
          <TabsContent value="all">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:gap-6">
              {[...Array(8)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="w-full rounded-lg bg-white">
      <Skeleton className="h-30 w-full md:h-[200px]" />
      <div className="space-y-[1.125rem] p-3 md:space-y-5 md:p-6">
        <div className="space-y-3 md:space-y-4">
          <div className="space-y-1 md:space-y-1.5">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-8 w-full md:h-10" />
      </div>
    </div>
  );
}
