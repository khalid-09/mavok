"use client";

import Description from "@/components/description";
import paypal from "../../../public/socials/paypal.png";
import amazon from "../../../public/socials/amazon.png";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Footer } from "@/lib/types/homepage";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

interface CartSummaryProps {
  data: Footer;
}

const CartSummary = ({ data }: CartSummaryProps) => {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) {
    return null;
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
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
              {totalItems} Items
            </Description>
            <span className="font-bold uppercase -tracking--1%">
              {formatPrice(totalPrice)}
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
            <Description className="text-start text-sm">Shipping</Description>
            <span className="font-bold uppercase -tracking--1%">Free</span>
          </div>
        </div>
        <Separator className="border-primaryBorder" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-black">Total (Inc. GST)</span>
          <span className="font-bold -tracking--1%">
            {formatPrice(totalPrice - 2)}
          </span>
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
  );
};

export default CartSummary;
