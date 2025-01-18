import { MedusaProducts } from "@/components/accessories-page/product-card";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLowestPrice = (
  medusaProducts: MedusaProducts[],
  medusaId: string,
) => {
  const matchingProduct = medusaProducts.find(
    (medusaProduct) => medusaProduct.id === medusaId,
  );

  if (!matchingProduct) {
    throw new Error(`Product with id ${medusaId} not found.`);
  }

  const lowestPrice = matchingProduct.prices
    ? Math.min(
        ...matchingProduct.prices.filter(
          (price): price is number => typeof price === "number",
        ),
      )
    : 0;

  return lowestPrice;
};

export const formatPrice = (amount: number, code?: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code || "eur",
  }).format(amount);
};
