import * as React from "react";

import { cn } from "@/lib/utils";
import Description from "../description";

const Box = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("content space-y-8 md:space-y-16", className)}
    {...props}
  />
));
Box.displayName = "Box";

const BoxHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-3 md:space-y-4", className)}
    {...props}
  />
));
BoxHeader.displayName = "BoxHeader";

const BoxTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn(
      "-tracking--[1%] text-center text-[2rem] font-bold uppercase md:text-4xl",
      className,
    )}
    {...props}
  />
));
BoxTitle.displayName = "BoxTitle";

const BoxDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }) => (
  <Description className={cn(className)} {...props} />
));
BoxDescription.displayName = "BoxDescription";

const BoxContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
BoxContent.displayName = "BoxContent";

export { Box, BoxHeader, BoxTitle, BoxDescription, BoxContent };

// resuable components for composing a box with a title and description and content
