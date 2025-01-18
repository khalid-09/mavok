import Description from "@/components/description";
import { FaStar } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Accessories } from "@/lib/types/accessories";
import { Footer } from "@/lib/types/homepage";
import ProductImages from "./product-images";
import { getRegionId } from "@/lib/queries/accessories-page-queries";
import { medusa } from "@/lib/medusa";
import BreadCrumbs from "./breadcrumbs";
import ProductCheckout from "./product-checkout";
import CartButtons from "./cart-buttons";

interface ProductDetailsProps {
  product: Accessories;
  footerData: Footer;
}

const ProductDetails = async ({
  product: directusProduct,
  footerData,
}: ProductDetailsProps) => {
  const id = await getRegionId();

  const { products } = await medusa.store.product.list({
    id: directusProduct.medusaID,
    region_id: id,
    fields: "id,*variants.calculated_price,*variants.title",
  });
  const variants = products[0].variants?.map((variant) => ({
    title: variant.title,
    price: variant.calculated_price?.original_amount || 0,
  }));

  return (
    <section className="px-10 pb-22 pt-10 customNav:p-4 customNav:pb-10">
      <div className="content space-y-3 md:space-y-6">
        <BreadCrumbs
          category={directusProduct.category[0].categories_id.categoryName}
        />
        <div className="flex flex-col md:flex-row md:gap-12 customNav:gap-6">
          <ProductImages productImages={directusProduct.productImages} />
          <div className="space-y-4 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-1 md:space-y-2">
                <span className="font-bold uppercase -tracking--1% text-primaryGreen">
                  {directusProduct.category[0].categories_id.categoryName}
                </span>
                <h5 className="text-3.5xl font-bold uppercase -tracking--1% text-black">
                  {directusProduct.productTitle}
                </h5>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar key={i} className="text-starOrange" />
                    ))}
                    <Description className="text-sm font-semibold text-black">
                      4.8
                    </Description>
                  </div>
                  <Description className="text-sm text-grey">(400)</Description>
                </div>
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <div className="flex items-center gap-2">
                  <Description className="font-semibold text-black">
                    $280.0
                  </Description>
                  <Description className="text-primaryRed">
                    Save 25% or $111
                  </Description>
                </div>
                <Description className="text-start text-sm">
                  {directusProduct.productDesc}
                </Description>
              </div>
            </div>
            <Separator className="border-primaryBorder" />
            <div className="space-y-3 md:space-y-4">
              <Description className="text-start text-sm font-medium md:text-base">
                Options
              </Description>
              {variants?.map((variant, i) => (
                <CartButtons key={i} variant={variant} />
              ))}
            </div>
            <Separator className="border-primaryBorder" />
            <ProductCheckout footerData={footerData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
