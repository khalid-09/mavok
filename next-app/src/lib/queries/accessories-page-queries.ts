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

  // set filter if category is not "all"
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
  } // else no filter

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
    } // return empty array if no items

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
    ); // fetch all categories

    if (!items || items.length === 0) {
      return [];
    } // return empty array if no items

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
    ); // fetch product by slug

    if (!item) {
      throw new Error("Product not found in Directus");
    } // throw error if no item found

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
    const { regions } = await medusa.store.region.list(); // fetch regions from Medusa Store using medusa SDK
    const id = regions[0].id; // get first region id / default region id

    return id;
  } catch (error) {
    console.error("Medusa error:", error);
    if (error instanceof Error) {
      console.log("Error message:", error.message);
    }
    throw new Error("Failed to fetch region id");
  }
}); // fetch region id from Medusa Store
