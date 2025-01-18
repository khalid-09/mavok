import { FaRegImage } from "react-icons/fa";
import { Accessories } from "@/lib/types/accessories";
import {
  Box,
  BoxContent,
  BoxDescription,
  BoxHeader,
  BoxTitle,
} from "../ui/box";

interface ProductPicturesProps {
  product: Accessories;
}

/**
 * ProductPictures component
 * @param {Accessories} product - product data
 * Shows the product pictures
 */

const ProductPictures = ({ product }: ProductPicturesProps) => {
  return (
    <section className="bg-secondaryLight px-4 py-10 md:px-30 md:py-22">
      <Box>
        <BoxHeader className="space-y-1.5 md:space-y-2">
          <p className="text-center font-bold uppercase -tracking--1% text-primaryGreen">
            {product.category[0].categories_id.categoryName}
          </p>
          <BoxTitle className="text-3.5xl md:text-4.5xl">
            {product.productTitle}
          </BoxTitle>
          <BoxDescription className="mx-auto max-w-[47.313rem]">
            {product.productDesc}
          </BoxDescription>
        </BoxHeader>
        <BoxContent className="grid w-full grid-cols-2 grid-rows-1 gap-4 md:grid-rows-2">
          <div className="col-span-2 flex aspect-[16/9] min-h-[21.438rem] w-full items-center justify-center rounded-md bg-white sm:aspect-auto sm:h-[35rem]">
            <FaRegImage size={26} className="text-lightLight" />
          </div>
          <div className="flex aspect-square min-h-[10.25rem] w-full items-center justify-center rounded-md bg-white sm:aspect-auto sm:h-[35rem]">
            <FaRegImage size={26} className="text-lightLight" />
          </div>
          <div className="flex aspect-square min-h-[10.25rem] w-full items-center justify-center rounded-md bg-white sm:aspect-auto sm:h-[35rem]">
            <FaRegImage size={26} className="text-lightLight" />
          </div>
        </BoxContent>
      </Box>
    </section>
  );
};

export default ProductPictures;
