import Description from "@/components/description";
import Faqs from "@/components/faqs";
import BreadCrumbs from "@/components/product-details-page/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { FaStar } from "react-icons/fa";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const slug = (await params).slug;

  return (
    <section className="p-4 pb-10 md:px-30 md:pb-22 md:pt-10">
      <div className="content space-y-6">
        <BreadCrumbs />
        <div className="flex flex-col gap-12 md:flex-row">
          <div className="space-y-4">
            <div className="bg-tertiaryLight min-h-[37.5rem] max-w-[40.75rem] rounded-lg"></div>
            <div className="flex items-center gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "bg-tertiaryLight size-[117.6px] rounded-lg",
                    i === 0 && "border border-primaryGreen bg-white",
                  )}
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="font-bold uppercase -tracking--1% text-primaryGreen">
                  MIG
                </span>
                <h5 className="text-3.5xl font-bold uppercase -tracking--1% text-black">
                  36 mig torch
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
                  <Description className="text-grey text-sm">(400)</Description>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Description className="font-semibold text-black">
                    $280.0
                  </Description>
                  <Description className="text-primaryRed">
                    Save 25% or $111
                  </Description>
                </div>
                <Description className="text-start text-sm">
                  Hendrerit amet quisque facilisi enim cras. Ornare sed mauris
                  malesuada montes tortor. Elementum cras elit nullam hendrerit
                  ultrices
                </Description>
              </div>
            </div>
            <Separator className="border-primaryBorder" />
            <div className="space-y-4">
              <Description className="text-start font-medium">
                Options
              </Description>
              <div className="flex items-center gap-3">
                <div className="shadow-custom flex h-10 w-full items-center justify-between rounded-lg border border-primaryBorder px-4 py-1.5">
                  <span className="font-bold uppercase -tracking--1%">
                    36 MIG TORCH a
                  </span>
                  <span className="font-bold -tracking--1%">$1,999 AUD</span>
                </div>
                <div className="shadow-custom flex h-10 w-[7.75rem] shrink-0 items-center justify-between gap-1 rounded-lg border border-primaryBorder p-1">
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
                  <div className="shadow-custom flex h-10 w-full items-center justify-between rounded-lg border border-primaryBorder px-4 py-1.5">
                    <span className="font-bold uppercase -tracking--1%">
                      36 MIG TORCH a
                    </span>
                    <span className="font-bold -tracking--1%">$1,999 AUD</span>
                  </div>
                  <Button className="shadow-custom flex h-10 w-[7.75rem] items-center gap-1 rounded-lg bg-primaryGreen px-3.5 text-white">
                    <ShoppingCart size={16} />
                    <span className="text-xs font-bold uppercase -tracking--1%">
                      Add to cart
                    </span>
                  </Button>
                </div>
              ))}
            </div>
            <Separator className="border-primaryBorder" />
            <div className="bg-tertiaryLight space-y-6 rounded-lg p-6">
              <div className="space-y-2">
                <div>
                  <h5 className="text-3.5xl font-bold -tracking--1%">
                    $1,999 AUD
                  </h5>
                  <div className="flex items-center gap-2">
                    <Description className="line-through">
                      $1,999 AUD
                    </Description>
                    <Description className="text-primaryRed">
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
          </div>
        </div>
      </div>
      <Faqs />
    </section>
  );
};

export default ProductPage;
