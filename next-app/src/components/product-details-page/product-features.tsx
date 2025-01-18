import { Accessories } from "@/lib/types/accessories";
import Image from "next/image";
import {
  Box,
  BoxContent,
  BoxDescription,
  BoxHeader,
  BoxTitle,
} from "../ui/box";

interface ProductFeaturesProps {
  product: Accessories;
}

/**
 * Product features component
 * @param {product} props - product from directus
 */

const ProductFeatures = ({ product }: ProductFeaturesProps) => {
  return (
    <section className="px-4 py-10 md:px-30 md:py-22">
      <Box>
        {/* DISPLAYING THE PRODUCT TITLE AND PRODUCT INFO */}
        <BoxHeader className="space-y-1.5 md:space-y-4">
          <BoxTitle className="text-3.5xl md:text-4.5xl">
            {product.productTitle}
          </BoxTitle>
          <BoxDescription className="mx-auto max-w-[55.5rem] whitespace-pre-line">
            {product.productInfo}
          </BoxDescription>
        </BoxHeader>

        {/* DISPLAYING THE PRODUCT ICONS AND FEATURE TEXT */}
        <BoxContent className="grid-row-2 grid grid-cols-1 gap-6 md:grid-cols-2">
          {product.productSupport.length === 0 && (
            <p>No product features added yet.</p>
          )}
          {product.productSupport.map(
            (
              {
                productSupportItems_id: {
                  featureTitle,
                  featureDesc,
                  featureImage,
                },
              }, // descructure product support items from product
              index,
            ) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-3 p-8 md:gap-6"
              >
                {/* PRODUCT FEATURE ICON, TITLE AND DESCRIPTION */}
                <Image
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}/assets/${featureImage}`}
                  width={48}
                  height={48}
                  alt={featureTitle}
                />
                <p className="text-center text-lg font-bold">{featureTitle}</p>
                <p className="text-center text-sm">{featureDesc}</p>
              </div>
            ),
          )}
        </BoxContent>
      </Box>
    </section>
  );
};

export default ProductFeatures;
