import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";
import { PropsWithChildren } from "react";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

interface DescriptionProps {
  className?: string;
}

/**
 * Description Component
 * Resuable component with basic styles and customizable with classes from outside.
 */

const Description = ({
  children,
  className,
}: PropsWithChildren<DescriptionProps>) => {
  return (
    <p
      className={cn(
        `${roboto.className} mx-auto text-center text-base text-primaryLight antialiased`,
        className,
      )}
    >
      {children}
    </p>
  );
};

export default Description;
