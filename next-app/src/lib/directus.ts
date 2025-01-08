import { createDirectus, rest } from "@directus/sdk";
import {
  AboutSection,
  FAQs,
  FooterLinks,
  HeroSection,
  InsideBox,
  Navbar,
} from "./types/homepage";

interface Schema {
  hero_section: HeroSection;
  about_section: AboutSection;
  footer_links: FooterLinks[];
  faqs: FAQs;
  inside_box: InsideBox;
  navbar: Navbar;
}

export const directus = createDirectus<Schema>(
  process.env.DIRECTUS_API_ENDPOINT!,
).with(rest());

// Directs client to with Schema
