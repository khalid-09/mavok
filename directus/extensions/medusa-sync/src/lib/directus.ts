import { createDirectus, rest } from '@directus/sdk';

export interface Accessories {
  id: string;
  productTitle: string;
  productDesc: string;
  slug: string;
  metadata?: {
    syncedFrom: 'medusa' | 'directus';
    syncId: string;
  }[];
  isMedusaIdUpdate: boolean;
  medusaID: string;
}

interface Schema {
  accessories: Accessories[];
}

export const directus = createDirectus<Schema>(
  process.env.DIRECTUS_API_URL!
).with(rest());
