import { formatPrice } from "@/lib/utils";
import IncreaseDescreaseButtons from "./increase-decrease-buttons";

interface CartButtonsProps {
  variant: {
    title: string | null;
    price: number;
  };
  showAddToCart: boolean;
  medusaId?: string; // Medusa ID
  directusId?: string;
}

/**
 * Cart buttons component
 * @param {variant} props - variant data of the product from medusa store
 * @returns {JSX.Element} - cart buttons component
 * shows the cart buttons
 */

const CartButtons = ({
  variant,
  showAddToCart,
  directusId,
  medusaId,
}: CartButtonsProps) => {
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

      <IncreaseDescreaseButtons
        directusId={directusId}
        medusaId={medusaId}
        variant={variant}
        showAddToCart={showAddToCart}
      />
    </div>
  );
};

export default CartButtons;
