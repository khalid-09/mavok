import {
  AlignJustify,
  CircleUserRound,
  Search,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Navbar as NavbarType } from "@/lib/types/homepage";

/**
 * Navbar component
 * returns the navbar of the home page with the data for navLinks taken as props from the HeroSection component which is fetched from the directus SDK from home_section collection
 */

interface NavbarProps {
  navbarData: NavbarType;
}

const Navbar = async ({ navbarData: { logo, navLinks } }: NavbarProps) => {
  return (
    <header className="flex items-center justify-between px-10 py-4 customNav:px-4">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Image
            src={`${process.env.DIRECTUS_API_ENDPOINT}/assets/${logo}`}
            alt="Logo"
            height={18}
            width={117}
          />
        </Link>

        <div className="block w-4 rotate-90 border border-white opacity-20 customNav:hidden" />

        <nav className="block customNav:hidden">
          <ul className="flex items-center gap-6">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="p-2 font-bold uppercase -tracking--1% transition-all duration-300 hover:scale-105"
              >
                <Link href={link.url}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2">
          <Search size={24} />
        </div>
        <Link href="/profile" className="p-2">
          <CircleUserRound size={24} />
        </Link>
        <Link href="/cart" className="relative p-2">
          <ShoppingCart size={24} />
          <span className="absolute right-1 top-2 flex size-3.5 items-center justify-center rounded-full bg-primaryGreen text-[10px]">
            2
          </span>
        </Link>
        <Button
          className="hidden size-10 items-center justify-center p-0 customNav:flex"
          variant="ghost"
        >
          <AlignJustify className="shrink-0" size={24} />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
