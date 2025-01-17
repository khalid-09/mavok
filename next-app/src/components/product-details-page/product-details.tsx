import Description from "@/components/description";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Headset, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { FaStar, FaTruck } from "react-icons/fa";
import { PiCreditCardFill, PiShieldCheckFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import BreadCrumbs from "@/components/product-details-page/breadcrumbs";
import { Accessories } from "@/lib/types/accessories";
import { Footer } from "@/lib/types/homepage";
import ProductImages from "./product-images";

interface ProductDetailsProps {
  product: Accessories;
  footerData: Footer;
}

const ProductDetails = ({ product, footerData }: ProductDetailsProps) => {
  return (
    <section className="px-10 pb-22 pt-10 customNav:p-4 customNav:pb-10">
      <div className="content space-y-3 md:space-y-6">
        <BreadCrumbs
          category={product.category[0].categories_id.categoryName}
        />
        <div className="flex flex-col md:flex-row md:gap-12 customNav:gap-6">
          <ProductImages productImages={product.productImages} />
          <div className="space-y-4 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-1 md:space-y-2">
                <span className="font-bold uppercase -tracking--1% text-primaryGreen">
                  {product.category[0].categories_id.categoryName}
                </span>
                <h5 className="text-3.5xl font-bold uppercase -tracking--1% text-black">
                  {product.productTitle}
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
                  {product.productDesc}
                </Description>
              </div>
            </div>
            <Separator className="border-primaryBorder" />
            <div className="space-y-3 md:space-y-4">
              <Description className="text-start text-sm font-medium md:text-base">
                Options
              </Description>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-full items-center justify-between rounded-lg border border-primaryBorder px-4 py-1.5 shadow-custom customNav:px-2">
                  <span className="text-sm font-bold uppercase -tracking--1% md:text-base">
                    36 MIG TORCH a
                  </span>
                  <span className="text-sm font-bold -tracking--1% md:text-base">
                    $1,999 AUD
                  </span>
                </div>
                <div className="flex h-10 w-[7.75rem] shrink-0 items-center justify-between gap-1 rounded-lg border border-primaryBorder p-1 shadow-custom">
                  <Button
                    className="size-8 rounded-md border-none bg-secondaryLight shadow-none"
                    variant="outline"
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="font-bold tabular-nums -tracking--1%">
                    2
                  </span>
                  <Button
                    className="size-8 rounded-md border-none bg-primaryGreen text-white shadow-none"
                    variant="outline"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex h-10 items-center gap-3">
                  <div className="flex h-10 w-full items-center justify-between rounded-lg border border-primaryBorder px-4 py-1.5 shadow-custom customNav:px-2">
                    <span className="text-sm font-bold uppercase -tracking--1% md:text-base">
                      36 MIG TORCH a
                    </span>
                    <span className="text-sm font-bold -tracking--1% md:text-base">
                      $1,999 AUD
                    </span>
                  </div>
                  <Button className="flex h-10 w-[7.75rem] items-center gap-1 rounded-lg bg-primaryGreen px-3.5 text-white shadow-custom">
                    <ShoppingCart size={16} />
                    <span className="text-xs font-bold uppercase -tracking--1%">
                      Add to cart
                    </span>
                  </Button>
                </div>
              ))}
            </div>
            <Separator className="border-primaryBorder" />
            <div className="space-y-5 rounded-lg bg-tertiaryLight p-4 md:space-y-6 md:p-6">
              <div className="space-y-2">
                <div>
                  <h5 className="text-2xl font-bold -tracking--1% md:text-3.5xl">
                    $1,999 AUD
                  </h5>
                  <div className="flex items-center gap-2">
                    <Description className="text-sm line-through md:text-base">
                      $1,999 AUD
                    </Description>
                    <Description className="text-sm text-primaryRed md:text-base">
                      Save 25% or $111
                    </Description>
                  </div>
                </div>
                <Description className="text-start text-sm">
                  or $27.75/month with 36-month financing*, before trade-in
                </Description>
              </div>
              <Button className="flex h-12 w-full items-center justify-center gap-2 bg-primaryGreen">
                <ShoppingCart className="size-5 shrink-0" />
                <span className="text-xs font-bold uppercase -tracking--1%">
                  Add to cart
                </span>
              </Button>
            </div>
            <div>
              <div className="flex h-12 w-full items-center gap-3 border-y border-primaryBorder py-3 text-primaryLight md:py-2">
                <FaTruck size={24} />
                <Description className="text-sm md:text-base">
                  Estimated dispatch with 2-days Free Shipping
                </Description>
              </div>
              <div className="flex h-12 w-full items-center gap-3 border-b border-primaryBorder py-3 text-primaryLight md:py-2">
                <PiShieldCheckFill size={24} />
                <Description className="text-sm md:text-base">
                  15-days return policy
                </Description>
                <ChevronRight className="ml-auto" size={24} />
              </div>
              <div className="flex h-12 w-full items-center gap-3 border-b border-primaryBorder py-3 text-primaryLight md:py-2">
                <Headset size={24} />
                <Description className="text-sm md:text-base">
                  Global support
                </Description>
              </div>
              <div className="flex h-12 w-full items-center gap-3 border-b border-primaryBorder py-3 text-primaryLight md:py-2">
                <PiCreditCardFill size={24} />
                <Description className="text-sm md:text-base">
                  Ways to pay
                </Description>
              </div>
              <div className="flex items-center gap-1.5 py-3 pl-9 md:py-2">
                {footerData.paymentImages.map((image) => (
                  <div key={image.id} className="relative h-5 w-8 md:w-7">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}/assets/${image.directus_files_id}`}
                      alt="Logo"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="absolute object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
