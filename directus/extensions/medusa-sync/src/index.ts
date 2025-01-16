import { defineHook } from '@directus/extensions-sdk';
import { getMedusaAuthToken } from './lib/auth';
import { kyInstance } from './lib/ky';
import { Accessories, directus } from './lib/directus';
import { readItem, updateItem } from '@directus/sdk';

export default defineHook(({ action, filter }, { env }) => {
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

      await directus.request(
        updateItem('accessories', key, {
          medusaID: response.id,
        })
      );

      console.log(`Successfully synced product to Medusa : `, response);
    } catch (error) {
      console.log(error);
    }
  });

  filter('items.delete', async (input, { collection }) => {
    if (collection !== 'accessories') return;

    const [id] = input as string[];

    const product = await directus.request(readItem('accessories', id!));

    if (product.metadata && product.metadata[0]?.syncedFrom === 'medusa') {
      console.log(
        `Skipping delete for product ${product.productTitle} - originated from Medusa`
      );
      return;
    }

    try {
      console.log(`Deleting product ${product.productTitle} from Medusa`);

      const token = await getMedusaAuthToken();

      const authenticatedKy = kyInstance.extend({
        headers: {
          Authorization: `Bearer ${token}`,
          'x-webhook-secret': WEBHOOK_SECRET,
        },
      });

      const response = await authenticatedKy
        .delete(`admin/directus`, {
          json: {
            event: 'product.delete',
            data: {
              id: product.medusaID,
            },
          },
        })
        .json();

      console.log(`Successfully deleted product from Medusa : ${response}`);
    } catch (error) {
      console.log(error);
    }
  });
});
