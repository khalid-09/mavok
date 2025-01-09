import ProdcutCard from "@/components/accessories-page/product-card";
import Description from "@/components/description";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";
import Image from "next/image";
import product from "@/../public/product.png";

const ProductsPage = () => {
  return (
    <section>
      <div className="flex items-center justify-center border-b border-primaryBorder p-4 sm:px-30 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-secondaryLight flex h-[9.25rem] w-[6.625rem] flex-col justify-between rounded-lg px-3 pb-[1.125rem] pt-3.5 sm:w-[7.75rem]">
            <div className="relative h-20 w-full">
              <Image
                src={product}
                fill
                className="absolute object-contain"
                alt="Product image"
              />
            </div>
            <span className="line-clamp-2 text-center text-sm font-bold uppercase -tracking--1%">
              All
            </span>
          </div>
          <div className="flex h-[9.25rem] w-[6.625rem] flex-col justify-between rounded-lg px-3 pb-[1.125rem] pt-3.5 sm:w-[7.75rem]">
            <div className="relative h-20 w-full">
              <Image
                src={product}
                fill
                className="absolute object-contain"
                alt="Product image"
              />
            </div>
            <span className="line-clamp-2 text-center text-sm font-bold uppercase -tracking--1%">
              Torches
            </span>
          </div>
          <div className="flex h-[9.25rem] w-[6.625rem] flex-col justify-between rounded-lg px-3 pb-[1.125rem] pt-3.5 sm:w-[7.75rem]">
            <div className="relative h-20 w-full shrink-0">
              <Image
                src={product}
                fill
                className="absolute object-contain"
                alt="Product image"
              />
            </div>
            <span className="line-clamp-2 text-center text-sm font-bold uppercase -tracking--1%">
              Machine Accessories
            </span>
          </div>
        </div>
      </div>
      <div className="bg-secondaryLight p-4 pb-10 xl:px-30 xl:py-16">
        <div className="content space-y-4 md:space-y-6">
          <div className="flex w-full items-center justify-between">
            <h6 className="text-xl font-bold uppercase -tracking--1% md:text-2xl">
              Accessories
            </h6>
            <div className="flex items-center gap-2">
              <Description className="hidden text-start text-sm font-normal md:block">
                Sort by:
              </Description>
              <Filter className="block text-primaryLight md:hidden" size={16} />
              <Button
                className="flex h-8 items-center gap-2 rounded-md p-1 md:p-2 md:pl-3"
                variant="ghost"
              >
                <span className="text-xs font-bold uppercase -tracking--1%">
                  Recommendation
                </span>
                <ChevronDown size={16} />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex">
                <ProdcutCard />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
