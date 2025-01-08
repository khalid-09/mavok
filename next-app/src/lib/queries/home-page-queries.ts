import { directus } from "../directus";
import { readItems, readSingleton } from "@directus/sdk";
import { AboutSection, HeroSection } from "../types/homepage";

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
};

export const getAboutData = async (): Promise<AboutSection> => {
  const item = await directus.request(
    readSingleton("about_section", { fields: ["*"] }),
  );

  if (!item) {
    throw new Error("About section not found");
  }

  return item;
};

export const getFooterLinksData = async () => {
  const items = await directus.request(
    readItems("footer_links", {
      fields: ["title", "links", "id"],
      sort: ["date_created"],
    }),
  );

  if (!items) {
    throw new Error("Footer links not found");
  }

  return items;
};

export const getFaqData = async () => {
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
};

// export const getPaymentOptionsData = async () => {
//   const item = await directus.request(
//     readSingleton("payment_options", { fields: ["*"] }),
//   );

//   console.log(item);
// };
