import Description from "@/components/description";
import product from "../../../../public/product.png";
import paypal from "../../../../public/socials/paypal.png";
import amazon from "../../../../public/socials/amazon.png";
import Image from "next/image";
import IncreaseDescreaseButtons from "@/components/product-details-page/increase-decrease-buttons";
import { LucideTrash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getFooterData } from "@/lib/queries/home-page-queries";

const CartPage = async () => {
  const data = await getFooterData();

  return (
    <section className="bg-secondaryLight md:px-30 md:pb-20 md:pt-10">
      <div className="content md:space-y-6">
        <h6 className="text-2xl font-bold -tracking--1%">MY CART</h6>
        <div className="flex w-full gap-12">
          <div className="w-full space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full gap-6 rounded-lg bg-white p-6"
              >
                <div className="bg relative size-24 shrink-0 overflow-hidden rounded-lg bg-tertiaryLight">
                  <Image
                    src={product}
                    alt="product"
                    fill
                    className="absolute object-contain"
                  />
                </div>
                <div className="flex w-full flex-col justify-between">
                  <div>
                    <div className="flex w-full items-center justify-between">
                      <p className="font-bold uppercase -tracking--1%">
                        mavok 220mp
                      </p>
                      <p className="font-bold uppercase -tracking--1%">
                        $1,990,00
                      </p>
                    </div>
                    <Description className="text-start text-xs">
                      Options: MAVOK TORCH A
                    </Description>
                  </div>
                  <div className="flex items-center justify-between">
                    <IncreaseDescreaseButtons showAddToCart={false} />
                    <button>
                      <LucideTrash2 size={20} className="text-lightLight" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full max-w-[25rem] space-y-6">
            <div className="w-full space-y-6 rounded-lg bg-white p-6">
              <div className="space-y-5">
                <span className="font-bold uppercase -tracking--1%">
                  Order Summary
                </span>
                <Separator className="border-primaryBorder" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Description className="text-start text-sm">
                    6 items
                  </Description>
                  <span className="font-bold uppercase -tracking--1%">
                    $1,468.00
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Description className="text-start text-sm">
                    Total Savings
                  </Description>
                  <span className="font-bold uppercase -tracking--1% text-primaryRed">
                    -$2.00
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <Description className="text-start text-sm">
                    Shipping
                  </Description>
                  <span className="font-bold uppercase -tracking--1%">
                    Free
                  </span>
                </div>
              </div>
              <Separator className="border-primaryBorder" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-black">
                  Total (Inc. GST)
                </span>
                <span className="font-bold -tracking--1%">$1,466.00</span>
              </div>
            </div>
            <Separator className="border-primaryBorder" />
            <div className="space-y-3">
              <Description className="text-start font-medium">
                Express Checkout
              </Description>
              <Button className="flex h-[3.25rem] w-full items-center justify-center border border-primaryBorder bg-white uppercase text-black shadow-custom">
                <span className="flex items-center gap-2 font-bold -tracking--1%">
                  <Image src={paypal} alt="paypal" />
                  Paypal
                </span>
              </Button>
              <Button className="flex h-[3.25rem] w-full items-center justify-center border border-primaryBorder bg-white uppercase text-black shadow-custom">
                <span className="flex items-center gap-2 font-bold -tracking--1%">
                  <Image src={amazon} alt="amazon" />
                  Amazon Pay
                </span>
              </Button>
            </div>
            <Separator className="border-primaryBorder" />
            <div className="space-y-3">
              <p className="text-center text-xs font-bold uppercase -tracking--1%">
                PAYMENT METHODS WE ACCEPT
              </p>
              <div className="flex items-center justify-center gap-3">
                {data.paymentImages.map((image) => (
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

export default CartPage;
