"use client";

import Image from "next/image";
import Description from "../description";
import { Button } from "../ui/button";
import Link from "next/link";
import { Accessories } from "@/lib/types/accessories";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const MotionLink = motion.create(Link);
const MotionButton = motion.create(Button);

interface ProductCardProps {
  product: Accessories;
  index: number;
}

const ProdcutCard = ({ product, index }: ProductCardProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
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
              <motion.p
                className="text-base font-bold uppercase -tracking--1%"
                whileHover={{ scale: 1.05, originX: 0 }}
              >
                {product.productTitle}
              </motion.p>
              <Description className="text-start text-sm leading-[1.125rem] md:leading-5">
                {product.productDesc}
              </Description>
            </div>
            <motion.p
              className="text-sm font-bold -tracking--1%"
              whileHover={{ scale: 1.05, originX: 0 }}
            >
              FROM $1,999.90
            </motion.p>
          </div>
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
