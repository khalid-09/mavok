"use client";

import { useState } from "react";
import { Accessories } from "@/lib/types/accessories";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductImagesProps {
  productImages: Accessories["productImages"];
}

const ProductImage = ({ productImages }: ProductImagesProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="w-full max-w-full space-y-3 md:max-w-[40.75rem] md:space-y-4">
      <div className="relative h-full max-h-[37.5rem] min-h-[21.375rem] w-full overflow-hidden rounded-lg bg-tertiaryLight">
        <Image
          src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}/assets/${productImages[selectedImageIndex].directus_files_id}`}
          alt="Product Image"
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="grid grid-cols-5 gap-2 md:gap-4">
        {productImages.slice(0, 5).map((image, i) => (
          <div
            key={i}
            className={cn(
              "relative aspect-square max-h-[3.75rem] w-full cursor-pointer overflow-hidden rounded-lg bg-tertiaryLight md:max-h-[7.35rem]",
              i === selectedImageIndex && "border border-primaryGreen",
            )}
            onClick={() => setSelectedImageIndex(i)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}/assets/${image.directus_files_id}`}
              alt={`Product Image ${i + 1}`}
              fill
              className="absolute object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
