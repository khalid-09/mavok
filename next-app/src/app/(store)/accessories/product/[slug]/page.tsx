import ProductPictures from "@/components/accessories-page/product-pictures";

import Faqs from "@/components/faqs";
import ProductDetails from "@/components/product-details-page/product-details";
import ProductFeatures from "@/components/product-details-page/product-features";
import ProductSpecifications from "@/components/product-details-page/product-specifications";

import {
  getAccessoriesData,
  getProductData,
} from "@/lib/queries/accessories-page-queries";
import { getFooterData } from "@/lib/queries/home-page-queries";
import { Metadata } from "next";
import { cache } from "react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Product page component
 * @param {ProductPageProps} props - product page props
 * @returns {JSX.Element} - product page component
 * shows product details, pictures, features and faqs
 */
const getProduct = cache(async (slug: string) => {
  const product = await getProductData(slug); // fetch product data from the slug

  return product;
}); // fetching product data from the slug

export const genereteMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const slug = (await params).slug; // get the product slug
  const product = await getProductData(slug); // fetch product data from the slug

  return {
    title: `Product : ${product.productTitle}`,
    description: product.productDesc,
    category: product.category[0].categories_id.categoryName,
  };
}; // generating dynamic metadata for the product page

export const generateStaticParams = async () => {
  const products = await getAccessoriesData(); // fetch all products

  return products.map((product) => ({
    slug: product.slug, // return product slug
  }));
}; // generating static paths for the product page

const ProductPage = async ({ params }: ProductPageProps) => {
  const [footerData, param] = await Promise.all([getFooterData(), params]); // fetch footer data (for ways to pay images) and product slug

  const product = await getProduct(param.slug); // fetch product data from the slug

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
