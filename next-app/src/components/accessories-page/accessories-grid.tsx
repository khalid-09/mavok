import { medusa } from "@/lib/medusa";
import {
  getAccessoriesData,
  getRegionId,
} from "@/lib/queries/accessories-page-queries";
import ProdcutCard from "./product-card";

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
  ]);

  const { products } = await medusa.store.product.list({
    region_id: id,
    fields: "id,*variants.calculated_price",
  });

  const formattedProducts = products.map((product) => ({
    id: product.id,
    prices: product.variants?.map(
      (variant) => variant.calculated_price?.original_amount || "N/A",
    ),
  }));

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
    </>
  );
};

export default AccessoriesGrid;
