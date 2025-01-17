import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <section className="px-10 pb-22 pt-10 customNav:p-4 customNav:pb-10">
      <div className="content space-y-3 md:space-y-6">
        <Skeleton className="h-6 w-64" />
        <div className="flex flex-col md:flex-row md:gap-12 customNav:gap-6">
          <div className="flex-1">
            <Skeleton className="aspect-square w-full" />
            <div className="mt-4 flex gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-1/4" />
              ))}
            </div>
          </div>
          <div className="flex-1 space-y-4 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-1 md:space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-3/4" />
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <Separator className="border-primaryBorder" />
            <div className="space-y-3 md:space-y-4">
              <Skeleton className="h-6 w-24" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex h-10 items-center gap-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-[7.75rem]" />
                </div>
              ))}
            </div>
            <Separator className="border-primaryBorder" />
            <div className="space-y-5 rounded-lg bg-tertiaryLight p-4 md:space-y-6 md:p-6">
              <div className="space-y-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
            <div>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-12 w-full items-center gap-3 border-b border-primaryBorder py-3 md:py-2"
                >
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
              <div className="flex items-center gap-1.5 py-3 pl-9 md:py-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-5 w-8 md:w-7"
                  /> /* Payment method icons */
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
