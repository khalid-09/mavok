import ProductPictures from "@/components/accessories-page/product-pictures";

import Faqs from "@/components/faqs";
import ProductDetails from "@/components/product-details-page/product-details";
import ProductFeatures from "@/components/product-details-page/product-features";
import ProductSpecifications from "@/components/product-details-page/product-specifications";

import { getProductData } from "@/lib/queries/accessories-page-queries";
import { getFooterData } from "@/lib/queries/home-page-queries";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Product page component
 * @param {ProductPageProps} props - product page props
 * @returns {JSX.Element} - product page component
 * shows product details, pictures, features and faqs
 */

const ProductPage = async ({ params }: ProductPageProps) => {
  const [footerData, param] = await Promise.all([getFooterData(), params]); // fetch footer data (for ways to pay images) and product slug

  const product = await getProductData(param.slug); // fetch product data from the slug

  return (
    <>
      <ProductDetails product={product} footerData={footerData} />
      <ProductPictures product={product} />
      <ProductFeatures product={product} />
      <ProductSpecifications product={product} />
      <Faqs />
    </>
  );
};

export default ProductPage;
