"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface IncreaseDescreaseButtonsProps {
  showAddToCart: boolean;
}

const IncreaseDescreaseButtons = ({
  showAddToCart,
}: IncreaseDescreaseButtonsProps) => {
  const [quantity, setQuantity] = useState<number>(0); // set the quantity of the product

  const handleAddToCart = () => {
    setQuantity(1);
  }; // add the product to the cart

  const updateQuantity = (delta: number) => {
    const newQuantity = Math.max(0, quantity + delta);
    setQuantity(newQuantity);
  }; // update the quantity of the product
  return (
    <>
      {quantity === 0 && showAddToCart ? (
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
    </>
  );
};

export default IncreaseDescreaseButtons;
