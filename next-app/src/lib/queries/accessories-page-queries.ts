import { readItems } from "@directus/sdk";
import { directus } from "../directus";
import { Accessories, Categories } from "../types/accessories";

class AccessoriesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AccessoriesError";
  }
}

export const getAccessoriesData = async (
  categoryName?: string,
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
        filter: filter,
      }),
    );

    if (items.length === 0) {
      throw new AccessoriesError(
        `No accessories found${categoryName ? ` for category: ${categoryName}` : ""}`,
      );
    }

    return items;
  } catch (error: unknown) {
    if (error instanceof AccessoriesError) {
      throw error;
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new AccessoriesError(`Failed to fetch accessories: ${errorMessage}`);
  }
};

export const getCategoriesData = async (): Promise<Categories[]> => {
  const items = await directus.request(
    readItems("categories", { fields: ["*"] }),
  );

  if (items.length === 0) {
    throw new Error("No categories found");
  }

  return items;
};
