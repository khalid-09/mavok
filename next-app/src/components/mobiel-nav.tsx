import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";
import { getNavBarData } from "@/lib/queries/home-page-queries";
import Image from "next/image";
import Link from "next/link";

const MobileNav = async () => {
  const navbar = await getNavBarData();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="hidden size-10 items-center justify-center p-0 customNav:flex"
          variant="ghost"
        >
          <AlignJustify className="shrink-0" size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="space-y-4">
          <SheetTitle>
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT}/assets/${navbar.logo}.svg`}
              alt="Logo"
              height={18}
              width={117}
              className="invert filter"
            />
          </SheetTitle>
          <SheetDescription>Navigation Panel</SheetDescription>
        </SheetHeader>
        {
          <ul className="mt-20 space-y-4">
            {navbar.navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.url}>{link.label}</Link>
              </li>
            ))}
          </ul>
        }
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
