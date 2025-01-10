import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Description from "../description";

const BreadCrumbs = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center sm:gap-2">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Description className="text-sm font-medium text-primaryLight">
              Consumables
            </Description>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-primaryLight" />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">
            <Description className="text-sm font-medium text-primaryLight">
              MIG
            </Description>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-primaryLight" />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <Description className="text-sm font-medium text-black">
              36 MIG Torch
            </Description>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbs;
