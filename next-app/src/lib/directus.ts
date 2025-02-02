import { createDirectus, rest } from "@directus/sdk";
import {
  AboutSection,
  FAQs,
  Footer,
  HeroSection,
  InsideBox,
  Navbar,
} from "./types/homepage";
import { Accessories, Categories } from "./types/accessories";

export interface Schema {
  navbar: Navbar;
  hero_section: HeroSection;
  about_section: AboutSection;
  inside_box: InsideBox;
  faqs: FAQs;
  footer: Footer;
  accessories: Accessories[];
  categories: Categories[];
}

export const directus = createDirectus<Schema>(
  process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT!,
).with(rest()); // Directs client with Schema
