"use client";

import Image from "next/image";
import Description from "../description";
import IncreaseDescreaseButtons from "../product-details-page/increase-decrease-buttons";
import { LucideTrash2 } from "lucide-react";
import product from "../../../public/product.png";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

const CartProducts = () => {
  const { items, removeFromCart } = useCartStore();

  const handleRemoveFromCart = (medusaId: string, variantTitle: string) => {
    removeFromCart(medusaId, variantTitle);
  };

  if (items.length === 0) {
    return <p>No product added to cart.</p>;
  }

  return (
    <div className="w-full space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex w-full gap-6 rounded-lg bg-white p-6">
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
                  {item.productTitle}
                </p>
                <p className="font-bold uppercase -tracking--1%">
                  {formatPrice(item.price)}
                </p>
              </div>
              <Description className="text-start text-xs">
                Options: <span className="uppercase">{item.variantTitle}</span>
              </Description>
            </div>
            <div className="flex items-center justify-between">
              <IncreaseDescreaseButtons
                medusaId={item.medusaId}
                directusId={item.directusId}
                productTitle={item.productTitle}
                variant={{
                  title: item.variantTitle,
                  price: item.price,
                }}
                showAddToCart={false}
              />
              <button
                onClick={() =>
                  handleRemoveFromCart(item.medusaId, item.variantTitle)
                }
              >
                <LucideTrash2
                  size={20}
                  className="text-lightLight transition duration-300 hover:text-primaryRed"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartProducts;
