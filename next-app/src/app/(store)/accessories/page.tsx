import Description from "@/components/description";
import { Filter } from "lucide-react";
import Image from "next/image";
import product from "@/../public/product.png";
import { getCategoriesData } from "@/lib/queries/accessories-page-queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SortButton from "@/components/accessories-page/sort-button";
import AccessoriesGrid from "@/components/accessories-page/accessories-grid";
import { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{ sort?: string }>;
}

export const metadata: Metadata = {
  title: "Accessories | Store Page",
  description: "Buy products.",
};

/**
 * The page component for the accessories page.
 * @param searchParams The search parameters used for sorting by storing the sort value in URL.
 */

const ProductsPage = async ({ searchParams }: PageProps) => {
  const [categories, params] = await Promise.all([
    getCategoriesData(),
    searchParams,
  ]); // getting the categories and search parameters

  const sortOrder = params?.sort === "a-z" ? "a-z" : "recommendation"; // setting the sort order

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="flex items-center justify-center rounded-none border-b border-primaryBorder p-4 sm:px-30 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* TABS TRIGGER TO FILTER PRODUCTS BY CATEGORY */}
          <TabsTrigger
            value="all"
            className="flex h-[9.25rem] w-[6.625rem] flex-col justify-between rounded-lg px-3 pb-[1.125rem] pt-3.5 sm:w-[7.75rem]"
          >
            <div className="relative h-20 w-full">
              <Image
                src={product}
                fill
                className="absolute object-contain"
                alt="Product image"
              />
            </div>
            <span className="text-center text-sm font-bold uppercase -tracking--1%">
              All
            </span>
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.categoryName}
              className="flex h-[9.25rem] w-[6.625rem] flex-col justify-between rounded-lg px-3 pb-[1.125rem] pt-3.5 sm:w-[7.75rem]"
            >
              <div className="relative h-20 w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}/assets/${category.categoryImage}`}
                  fill
                  className="absolute object-contain"
                  alt="Product image"
                />
              </div>
              <span className="text-center text-sm font-bold uppercase -tracking--1%">
                {category.categoryName}
              </span>
            </TabsTrigger>
          ))}
        </div>
      </TabsList>

      {/* PRODUCT SORTING SECTION */}
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
              <SortButton currentSort={sortOrder} />
            </div>
          </div>

          {/* REDERING THE FILTERED AND SORTED CONTENT IN PRODUCT CARD INSIDE ACCESSORIESGRID */}
          <TabsContent value="all">
            <AccessoriesGrid category="all" sortOrder={sortOrder} />
          </TabsContent>
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.categoryName}>
              <AccessoriesGrid
                category={category.categoryName}
                sortOrder={sortOrder}
              />
            </TabsContent>
          ))}
        </div>
      </div>
    </Tabs>
  );
};

export default ProductsPage;
