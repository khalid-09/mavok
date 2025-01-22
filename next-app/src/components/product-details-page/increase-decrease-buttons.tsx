"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/cart-store";

interface IncreaseDescreaseButtonsProps {
  showAddToCart: boolean;
  variant?: {
    title: string | null;
    price: number;
  };
  medusaId?: string;
  directusId?: string;
  productTitle?: string;
}

const IncreaseDescreaseButtons = ({
  showAddToCart,
  medusaId,
  directusId,
  variant,
  productTitle,
}: IncreaseDescreaseButtonsProps) => {
  // const [quantity, setQuantity] = useState<number>(0); // set the quantity of the product
  const { addToCart, updateQuantity, getItemQuantity } = useCartStore();

  const productQuantitiyInCart = getItemQuantity(
    medusaId!,
    variant?.title || "",
  );

  const handleAddToCart = () => {
    addToCart(
      medusaId!,
      variant?.title || "",
      variant?.price || 0,
      productTitle!,
      directusId!,
    );
  }; // add the product to the cart

  const handleUpdateQuantity = (delta: number) => {
    const newQuantity = Math.max(0, productQuantitiyInCart + delta);
    updateQuantity(medusaId!, variant?.title || "", newQuantity);
  }; // update the quantity of the product

  return (
    <>
      {productQuantitiyInCart === 0 && showAddToCart ? (
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
            onClick={() => handleUpdateQuantity(-1)}
            className="size-8 rounded-md border-none bg-secondaryLight shadow-none"
            variant="outline"
          >
            <Minus size={16} />
          </Button>
          <span className="font-bold tabular-nums -tracking--1%">
            {productQuantitiyInCart}
          </span>
          <Button
            onClick={() => handleUpdateQuantity(1)}
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
