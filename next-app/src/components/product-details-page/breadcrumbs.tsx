"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Description from "../description";
import { usePathname } from "next/navigation";

interface BreadCrumbsProps {
  category: string;
}

const BreadCrumbs = ({ category }: BreadCrumbsProps) => {
  const pathname = usePathname();
  const [collection, , productName] = pathname.split("/").slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center gap-1 sm:gap-2">
        <BreadcrumbItem>
          <BreadcrumbLink href="/accessories">
            <Description className="text-sm font-medium capitalize text-primaryLight">
              {collection}
            </Description>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-primaryLight" />
        <BreadcrumbItem>
          <Description className="text-sm font-medium text-primaryLight">
            {category}
          </Description>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-primaryLight" />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <Description className="text-sm font-medium capitalize text-black">
              {productName.replaceAll("-", " ")}
            </Description>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
