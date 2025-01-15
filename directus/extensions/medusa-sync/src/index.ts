import { defineHook } from '@directus/extensions-sdk';
import { getMedusaAuthToken } from './lib/auth';
import { kyInstance } from './lib/ky';

export interface Accessories {
  id: string;
  productTitle: string;
  productDesc: string;
  slug: string;
  metadata?: {
    syncedFrom: 'medusa' | 'directus';
    syncId: string;
  }[];
}

export default defineHook(({ action }, { env }) => {
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('WEBHOOK_SECRET environment variable is required');
  }

  action('items.create', async ({ payload, key, collection }) => {
    if (collection !== 'accessories') return;
    const product = payload as Accessories;

    if (product.metadata && product.metadata[0]?.syncedFrom === 'medusa') {
      console.log(
        `Skipping sync for product ${product.productTitle} - originated from Medusa`
      );
      return;
    }

    try {
      console.log(`Syncing product ${product.productTitle} to Medusa`);

      const token = await getMedusaAuthToken();

      const authenticatedKy = kyInstance.extend({
        headers: {
          Authorization: `Bearer ${token}`,
          'x-webhook-secret': WEBHOOK_SECRET,
        },
      });

      const response = await authenticatedKy
        .post('admin/directus', {
          json: {
            event: 'product.create',
            data: {
              title: product.productTitle,
              description: product.productDesc,
              handle: product.slug.replace('/', ''),
              metadata: {
                syncedFrom: 'directus',
                syncId: `directus_sync_${Date.now()}`,
              },
            },
          },
        })
        .json<{ id: string }>();

      console.log(
        `Successfully synced product ${response} to Medusa`,
        response
      );
    } catch (error) {
      console.log(error);
    }
  });
});
