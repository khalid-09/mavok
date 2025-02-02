"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface CartButtonsProps {
  variant: {
    title: string | null;
    price: number;
  };
}

/**
 * Cart buttons component
 * @param {variant} props - variant data of the product from medusa store
 * @returns {JSX.Element} - cart buttons component
 * shows the cart buttons
 */

const CartButtons = ({ variant }: CartButtonsProps) => {
  const [quantity, setQuantity] = useState<number>(0); // set the quantity of the product

  const handleAddToCart = () => {
    setQuantity(1);
  }; // add the product to the cart

  const updateQuantity = (delta: number) => {
    const newQuantity = Math.max(0, quantity + delta);
    setQuantity(newQuantity);
  }; // update the quantity of the product

  return (
    <div className="flex h-10 items-center gap-3">
      <div className="flex h-10 w-full items-center justify-between rounded-lg border border-primaryBorder px-4 py-1.5 shadow-custom customNav:px-2">
        <span className="line-clamp-1 text-sm font-bold uppercase -tracking--1%">
          {variant.title}
        </span>
        <span className="text-sm font-bold -tracking--1% md:text-base">
          {formatPrice(variant.price)}{" "}
          {/** format the price according to country code */}
        </span>
      </div>

      {quantity === 0 ? (
        // if quantity is 0, show add to cart button
        <Button
          onClick={handleAddToCart}
          className="flex h-10 w-[7.75rem] items-center gap-1 rounded-lg bg-primaryGreen px-3.5 text-white shadow-custom"
        >
          <ShoppingCart size={16} />
          <span className="text-xs font-bold uppercase -tracking--1%">
            Add to cart
          </span>
        </Button>
      ) : (
        // if quantity is not 0, show increase and decrease buttons
        <div className="flex h-10 w-[7.75rem] shrink-0 items-center justify-between gap-1 rounded-lg border border-primaryBorder p-1 shadow-custom">
          <Button
            onClick={() => updateQuantity(-1)}
            className="size-8 rounded-md border-none bg-secondaryLight shadow-none"
            variant="outline"
          >
            <Minus size={16} />
          </Button>
          <span className="font-bold tabular-nums -tracking--1%">
            {quantity}
          </span>
          <Button
            onClick={() => updateQuantity(1)}
            className="size-8 rounded-md border-none bg-primaryGreen text-white shadow-none"
            variant="outline"
          >
            <Plus size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartButtons;
