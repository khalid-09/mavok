import product from "@/../public/product.png";
import Image from "next/image";
import Description from "../description";
import { Button } from "../ui/button";
import Link from "next/link";

const ProdcutCard = () => {
  return (
    <div className="w-full rounded-lg bg-white">
      <div className="relative flex h-30 w-full items-end justify-center md:h-[200px]">
        <Image
          src={product}
          alt="xyz"
          fill
          className="absolute object-contain"
        />
      </div>
      <div className="space-y-[1.125rem] p-3 md:space-y-5 md:p-6">
        <div className="space-y-3 md:space-y-4">
          <div className="space-y-1 md:space-y-1.5">
            <p className="text-base font-bold uppercase -tracking--1%">
              36 Mig Torch
            </p>
            <Description className="text-start text-sm leading-[1.125rem] md:leading-5">
              Velit velit amet lacus a sem felis. Blandit hendrerit imperdiet
              turpis purus
            </Description>
          </div>
          <p className="text-sm font-bold -tracking--1%">FROM $1,999.90</p>
        </div>
        <Button
          asChild
          className="h-8 w-full rounded-lg bg-primaryGreen px-4 py-2 text-center text-sm font-bold uppercase -tracking--1% text-white md:h-10"
        >
          <Link href="/cart">Add to cart</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProdcutCard;
