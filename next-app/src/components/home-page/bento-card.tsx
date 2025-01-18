"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";

interface BentoCardProps {
  text: string;
  className?: string;
  index: number;
}

// SIMPLE BOX COMPONENT WITH MOTION ANIMATIONS

export const BentoCard = ({ text, className = "", index }: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: index * 0.1,
        },
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      className="h-full w-full"
    >
      <Card
        className={`group h-46 w-full overflow-hidden rounded-lg border-none bg-secondaryDark p-4 transition-colors duration-300 hover:bg-secondaryDark/90 md:h-[18.25rem] md:p-8 ${className}`}
      >
        <motion.span
          className="block break-words text-base font-bold leading-5 -tracking--1% text-white transition-colors md:text-xl md:leading-[1.875rem]"
          initial={{ opacity: 0.8 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {text}
        </motion.span>
      </Card>
    </motion.div>
  );
};
