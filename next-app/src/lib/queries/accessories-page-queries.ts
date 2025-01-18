import { readItems } from "@directus/sdk";
import { directus } from "../directus";
import { Accessories, Categories } from "../types/accessories";
import { medusa } from "../medusa";
import { cache } from "react";

export const getAccessoriesData = async (
  categoryName?: string,
  sortOrder: "recommendation" | "a-z" = "recommendation",
): Promise<Accessories[]> => {
  let filter = {};

  if (categoryName && categoryName.toLowerCase() !== "all") {
    filter = {
      category: {
        categories_id: {
          categoryName: {
            _eq: categoryName,
          },
        },
      },
    };
  }

  try {
    const items = await directus.request(
      readItems("accessories", {
        fields: ["*", "productImages.*", "category.categories_id.*"],
        filter,
        sort: sortOrder === "a-z" ? "productTitle" : [],
      }),
    );

    if (!items || items.length === 0) {
      return [];
    }

    return items;
  } catch (error) {
    console.error("Directus error:", error);
    if (error instanceof Error) {
      console.log("Error message:", error.message);
    }
    throw new Error("Failed to fetch accessories");
  }
};

export const getCategoriesData = async (): Promise<Categories[]> => {
  try {
    const items = await directus.request(
      readItems("categories", {
        fields: ["*"],
      }),
    );

    if (!items || items.length === 0) {
      return [];
    }

    return items;
  } catch (error: unknown) {
    console.error("Directus error:", error);
    if (error instanceof Error) {
      console.log("Error message:", error.message);
    }
    throw new Error(`Failed to fetch categories : ${error}}`);
  }
};

export const getProductData = async (slug: string): Promise<Accessories> => {
  try {
    const [item] = await directus.request(
      readItems("accessories", {
        fields: [
          "*",
          "productImages.*",
          "category.categories_id.*",
          "productSupport.productSupportItems_id.*",
          "productSpecs.productSpecItems_id.*",
        ],
        filter: {
          slug: {
            _eq: slug,
          },
        },
      }),
    );

    if (!item) {
      throw new Error("Product not found in Directus");
    }

    return item;
  } catch (error) {
    console.error("Directus error:", error);
    if (error instanceof Error) {
      console.log("Error message:", error.message);
    }
    throw new Error(`Failed to fetch product : ${error}}`);
  }
};

export const getRegionId = cache(async (): Promise<string> => {
  try {
    const { regions } = await medusa.store.region.list();
    const id = regions[0].id;

    return id;
  } catch (error) {
    console.error("Medusa error:", error);
    if (error instanceof Error) {
      console.log("Error message:", error.message);
    }
    throw new Error("Failed to fetch region id");
  }
});
