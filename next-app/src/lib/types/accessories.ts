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
  medusaID: string;
  productInfo: string;
  "productImages.*": unknown;
  "category.categories_id.*": unknown;
  "productSupport.productSupportItems_id.*": unknown;
}

export interface Categories {
  id: number;
  date_created: string;
  categoryName: string;
  categoryImage: string;
}
