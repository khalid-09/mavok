import { PiCreditCardFill, PiShieldCheckFill } from "react-icons/pi";
import { cn, formatPrice } from "@/lib/utils";
import { ChevronRight, Headset, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Description from "../description";
import { Button } from "../ui/button";
import { FaTruck } from "react-icons/fa";
import { Footer } from "@/lib/types/homepage";

interface ProductCheckoutProps {
  footerData: Footer;
  variants:
    | {
        title: string | null;
        price: number;
      }[]
    | undefined;
}

/**
 * Product checkout component
 * @param {footerData} props - footer data for payment images
 * shows product checkout details
 */

const ProductCheckout = ({ footerData, variants }: ProductCheckoutProps) => {
  const prices = variants?.map((variant) => variant.price);
  const lowestPrice = Math.min(...prices!);

  return (
    <>
      <div className="space-y-5 rounded-lg bg-tertiaryLight p-4 md:space-y-6 md:p-6">
        <div className="space-y-2">
          <div>
            <h5 className="text-2xl font-bold -tracking--1% md:text-3.5xl">
              {formatPrice(lowestPrice, "eur")}
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

        {/* USING THE IMAGES FROM FOOTER DATA */}
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
    </>
  );
};

export default ProductCheckout;
