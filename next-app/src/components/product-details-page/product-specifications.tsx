import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Box,
  BoxContent,
  BoxDescription,
  BoxHeader,
  BoxTitle,
} from "../ui/box";
import { Accessories } from "@/lib/types/accessories";

interface ProductSpecificationsProps {
  product: Accessories;
}

/**
 * Product specifications component
 * @param {product} Accessories - product data of directus
 */

const ProductSpecifications = ({ product }: ProductSpecificationsProps) => {
  return (
    <section className="md:px-30 md:py-22 customNav:px-4 customNav:pt-10">
      <Box>
        {/* DISPLAYING TITLE AND DESCRIPTION */}
        <BoxHeader>
          <p className="text-center text-sm font-bold uppercase -tracking--1% text-primaryGreen md:text-base">
            specifications
          </p>
          <BoxTitle className="text-3.5xl md:text-4.5xl">
            {product.productTitle}
          </BoxTitle>
          <BoxDescription className="mx-auto max-w-[47.313rem]">
            {product.productDesc}
          </BoxDescription>
        </BoxHeader>

        {/* RENDERING THE PRODUCT SPECIFICATIONS IN AN COLLAPSIBLE ACCORDIAN */}
        <BoxContent>
          <Accordion type="single" collapsible className="w-full">
            {product.productSpecs.length === 0 && (
              <p>No specifications added.</p>
            )}
            {product.productSpecs.map(
              // GETTING THE SPECIFICATIONS BY DESCTRUCTURING THE productSpecItems_id OBJECT
              ({ productSpecItems_id: { specTitle, specs } }, index) => (
                <AccordionItem key={index} className="border-t" value="item-1">
                  <AccordionTrigger className="font-bold uppercase -tracking--1%">
                    {specTitle}
                  </AccordionTrigger>
                  <AccordionContent className="grid w-full grid-cols-1 md:grid-cols-2">
                    {specs.map(({ label, value }, index) => (
                      <p
                        key={index}
                        className="flex justify-between gap-3 py-3 md:justify-normal md:py-5"
                      >
                        <span className="w-full max-w-[13.25rem] text-sm font-bold uppercase -tracking--1%">
                          {label}
                        </span>
                        <span className="text-sm text-primaryLight">
                          {value}
                        </span>
                      </p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </BoxContent>
      </Box>
    </section>
  );
};

export default ProductSpecifications;
