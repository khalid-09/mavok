"use client";

import Image from "next/image";
import Description from "../description";
import { Button } from "../ui/button";
import Link from "next/link";
import { Accessories } from "@/lib/types/accessories";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { formatPrice, getLowestPrice } from "@/lib/utils";

const MotionLink = motion.create(Link);
const MotionButton = motion.create(Button);

export interface MedusaProducts {
  id: string;
  prices: (number | "N/A")[] | undefined;
}

interface ProductCardProps {
  product: Accessories;
  index: number;
  medusaProducts: MedusaProducts[];
}

/**
 * The product card component for the accessories page.
 * @param product The product data from directus.
 * @param index The index of the product in the grid.
 * @param medusaProducts The products from medusa.
 * @returns The product card component.
 */

const ProdcutCard = ({ product, index, medusaProducts }: ProductCardProps) => {
  const router = useRouter();

  const lowestPrice = getLowestPrice(medusaProducts, product.medusaID); // getting the lowest price of the product variants from medusa

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
    >
      <MotionLink
        href={`/accessories/product/${product.slug}`}
        className="block w-full rounded-lg bg-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative flex h-30 w-full items-end justify-center md:h-[200px]"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {/* IMAGE OF THE PRODUCT */}
          <Image
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}/assets/${product.productImages[0].directus_files_id}`}
            alt={`${product.productTitle} Image`}
            fill
            className="absolute object-contain"
          />
        </motion.div>
        <div className="space-y-[1.125rem] p-3 md:space-y-5 md:p-6">
          <div className="space-y-3 md:space-y-4">
            <div className="space-y-1 md:space-y-1.5">
              {/* TITLE OF THE PRODUCT  */}
              <motion.p
                className="line-clamp-1 text-base font-bold uppercase -tracking--1%"
                whileHover={{ scale: 1.05, originX: 0 }}
              >
                {product.productTitle}
              </motion.p>

              {/* DESCRIPTION OF THE PRODUCT */}
              <Description className="line-clamp-3 text-start text-sm leading-[1.125rem] md:leading-5">
                {product.productDesc}
              </Description>
            </div>

            {/* PRICE OF THE PRODUCT - showing the price of the variant which has the lowset price*/}
            <motion.p
              className="text-sm font-bold -tracking--1%"
              whileHover={{ scale: 1.05, originX: 0 }}
            >
              FROM {formatPrice(lowestPrice)}
            </motion.p>
          </div>
          {/* ADD TO CART BUTTON */}
          <MotionButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push("/cart");
            }}
            className="h-8 w-full rounded-lg bg-primaryGreen px-4 py-2 text-center text-sm font-bold uppercase -tracking--1% text-white md:h-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to cart
          </MotionButton>
        </div>
      </MotionLink>
    </motion.div>
  );
};

export default ProdcutCard;
