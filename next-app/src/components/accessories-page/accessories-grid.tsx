import { medusa } from "@/lib/medusa";
import {
  getAccessoriesData,
  getRegionId,
} from "@/lib/queries/accessories-page-queries";
import ProdcutCard from "./product-card";

/**
 * The grid component for the accessories page.
 * @param category The category of the accessories.
 * @param sortOrder The sort order of the accessories.
 * @returns The grid of product cards.
 */

const AccessoriesGrid = async ({
  category,
  sortOrder,
}: {
  category: string;
  sortOrder: "recommendation" | "a-z";
}) => {
  const [accessories, id] = await Promise.all([
    getAccessoriesData(category, sortOrder),
    getRegionId(),
  ]); // getting the products(accessories) from directus and region id from medusa (req to get price of a product variant in meudsa)

  const { products } = await medusa.store.product.list({
    region_id: id,
    fields: "id,*variants.calculated_price",
  }); // getting the products from medusa

  const formattedProducts = products.map((product) => ({
    id: product.id,
    prices: product.variants?.map(
      (variant) => variant.calculated_price?.original_amount || "N/A",
    ),
  })); // formatting the products to get the prices of the product variants

  return (
    <>
      {accessories.length === 0 ? (
        <p>No product found. Start creating some.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:gap-6">
          {accessories.map((product, index) => (
            <ProdcutCard
              medusaProducts={formattedProducts}
              index={index}
              key={index}
              product={product}
            />
          ))}
        </div>
      )}
      {/* rendering the product cards */}
    </>
  );
};

export default AccessoriesGrid;
