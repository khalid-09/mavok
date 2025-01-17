import ProdcutCard from "@/components/accessories-page/product-card";
import Description from "@/components/description";
import { Filter } from "lucide-react";
import Image from "next/image";
import product from "@/../public/product.png";
import {
  getAccessoriesData,
  getCategoriesData,
} from "@/lib/queries/accessories-page-queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SortButton from "@/components/accessories-page/sort-button";
import { medusa } from "@/lib/medusa";

interface PageProps {
  searchParams: Promise<{ sort?: string }>;
}

const ProductsPage = async ({ searchParams }: PageProps) => {
  const [categories, params] = await Promise.all([
    getCategoriesData(),
    searchParams,
  ]);

  const sortOrder = params?.sort === "a-z" ? "a-z" : "recommendation";

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="flex items-center justify-center rounded-none border-b border-primaryBorder p-4 sm:px-30 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-4">
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

const AccessoriesGrid = async ({
  category,
  sortOrder,
}: {
  category: string;
  sortOrder: "recommendation" | "a-z";
}) => {
  const accessories = await getAccessoriesData(category, sortOrder);

  return (
    <>
      {accessories.length === 0 ? (
        <p>No product found. Start creating some.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:gap-6">
          {accessories.map((product, index) => (
            <ProdcutCard index={index} key={index} product={product} />
          ))}
        </div>
      )}
    </>
  );
};
