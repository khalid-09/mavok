export interface Accessories {
  id: string;
  productTitle: string;
  productDesc: string;
  slug: string;
  productImages: {
    id: number;
    accessories_id: string;
    directus_files_id: string;
  }[];
  category: {
    categories_id: {
      id: number;
      date_created: string;
      categoryName: string;
      categoryImage: string;
    };
  }[];
  productSupport: {
    productSupportItems_id: {
      id: number;
      featureTitle: string;
      featureDesc: string;
      featureImage: string;
    };
  }[];
  productSpecs: {
    productSpecItems_id: {
      id: number;
      specTitle: string;
      specs: {
        label: string;
        value: string;
      }[];
    };
  }[];
  medusaID: string;
  productInfo: string;

  // The following fields are not present in the original data but are added to avoid type error as directus sdk donsen't let us query for fields other then * and the keys of the defined type
  "productImages.*": unknown;
  "category.categories_id.*": unknown;
  "productSupport.productSupportItems_id.*": unknown;
  "productSpecs.productSpecItems_id.*": unknown;
}

export interface Categories {
  id: number;
  date_created: string;
  categoryName: string;
  categoryImage: string;
}
