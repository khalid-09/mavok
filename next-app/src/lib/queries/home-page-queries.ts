import { directus } from "../directus";
import { readSingleton } from "@directus/sdk";
import {
  AboutSection,
  FAQs,
  Footer,
  HeroSection,
  InsideBox,
  Navbar,
} from "../types/homepage";

export const getNavBarData = async (): Promise<Navbar> => {
  const item = await directus.request(
    readSingleton("navbar", { fields: ["*"] }),
  );

  if (!item) {
    throw new Error("Navbar not found");
  }

  return item;
}; // Fn to fetch all data related to Navbar which is a singleton collection

export const getHeroData = async (): Promise<HeroSection> => {
  const item = await directus.request(
    readSingleton("hero_section", {
      fields: ["*"],
    }),
  );

  if (!item) {
    throw new Error("Hero section not found");
  }

  return item;
}; // Fn to fetch all data related to Hero Section which is a singleton collection

export const getAboutData = async (): Promise<AboutSection> => {
  const item = await directus.request(
    readSingleton("about_section", { fields: ["*"] }),
  );

  if (!item) {
    throw new Error("About section not found");
  }

  return item;
}; // Fn to fetch all data related to About Section which is a singleton collection

export const getFaqData = async (): Promise<
  Omit<FAQs, "id" | "date_created">
> => {
  const item = await directus.request(
    readSingleton("faqs", {
      fields: ["content"],
      sort: ["date_created"],
    }),
  );

  if (!item) {
    throw new Error("FAQs not found");
  }

  return item;
}; // Fn to fetch FAQ data which is a singleton collection

export const getInsideBoxData = async (): Promise<Omit<InsideBox, "id">> => {
  const item = await directus.request(
    readSingleton("inside_box", {
      fields: ["title", "description", "content"],
    }),
  );

  if (!item) {
    throw new Error("Inside box not found");
  }

  return item;
}; // Fn to fetch InsideBoxSection data which is a singleton collection

export const getFooterData = async (): Promise<Footer> => {
  const item = await directus.request(
    readSingleton("footer", {
      fields: ["*", "paymentImages.*"],
    }),
  );

  if (!item) {
    throw new Error("Footer data not found");
  }

  return item;
}; // Fn to fetch Footer data which is a singleton collection
