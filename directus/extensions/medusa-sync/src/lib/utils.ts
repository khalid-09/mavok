import { readItem, updateItem } from '@directus/sdk';
import { Accessories, directus } from './directus';
import { getMedusaAuthToken } from './auth';
import { kyInstance } from './ky';

const SYNC_THRESHOLD = 7000; // 7 seconds threshold

const shouldSkipSync = (product: Partial<Accessories>): boolean => {
  if (!product.metadata) {
    return false;
  } // return false if metadata is not present

  const currentTime = Date.now();
  const lastSyncTime = product.metadata?.[0]?.lastSyncTimestamp || 0;

  if (currentTime - lastSyncTime < SYNC_THRESHOLD) {
    console.log(
      `Skipping sync - too soon after last sync (${
        currentTime - lastSyncTime
      }ms)`
    );
    return true;
  } // return true if the product was synced too soon

  return false; //
}; // checking if the product should be skipped for sync

export const createProduct = async (product: Accessories, key: string) => {
  if (product.metadata && product.metadata[0]?.syncedFrom === 'medusa') {
    console.log(
      `Skipping sync for product ${product.productTitle} - originated from Medusa`
    );
    return;
  } // If the product is originated from Medusa (when prodcut is created in medusa and synced to directus, then we should skip the sync)

  try {
    console.log(`Syncing product ${product.productTitle} to Medusa`);

    const token = await getMedusaAuthToken(); // getting the Medusa auth token

    const authenticatedKy = kyInstance.extend({
      headers: {
        Authorization: `Bearer ${token}`,
        'x-webhook-secret': process.env.WEBHOOK_SECRET,
      },
    }); // extending the ky instance with the Medusa auth token and webhook secret

    const response = await authenticatedKy
      .post('admin/directus', {
        json: {
          event: 'product.create',
          data: {
            title: product.productTitle,
            description: product.productDesc,
            handle: product.slug,
            metadata: {
              syncedFrom: 'directus',
              syncId: `directus_sync_${Date.now()}`,
            },
          },
        },
      }) // creating a product in Medusa
      .json<{ id: string }>();

    await directus.request(
      updateItem('accessories', key, {
        medusaID: response.id,
        isMedusaIdUpdate: true,
      })
    ); // updating the product in Directus with the Medusa ID

    console.log(`Successfully synced product to Medusa : `, response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: string) => {
  const product = await directus.request(
    readItem('accessories', id!, {
      fields: ['medusaID', 'productTitle'],
    })
  ); // getting the product from Directus to get the Medusa ID

  try {
    console.log(`Deleting product ${product.productTitle} from Medusa`);

    const token = await getMedusaAuthToken(); // getting the Medusa auth token

    const authenticatedKy = kyInstance.extend({
      headers: {
        Authorization: `Bearer ${token}`,
        'x-webhook-secret': process.env.WEBHOOK_SECRET,
      },
    }); // extending the ky instance with the Medusa auth token and webhook secret

    const response = await authenticatedKy
      .delete(`admin/directus`, {
        json: {
          event: 'product.delete',
          data: {
            id: product.medusaID,
          },
        },
      }) // deleting a product in Medusa
      .json();

    console.log(`Successfully deleted product from Medusa : ${response}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (
  product: Partial<Accessories>,
  key: string
) => {
  const fullProduct = await directus.request(readItem('accessories', key!)); // getting the full product from Directus

  if (shouldSkipSync(product)) return; // checking if the product should be skipped for sync (in case when product is just updated in medusa and the chages are synced to directus then we should skip the sync as we don't want to create a loop and sync back the same changes to medusa)

  if (product.isMedusaIdUpdate) {
    console.log(
      `Skipping UPDATE sync for product ${product.productTitle} - Medusa ID update`
    );
    return;
  } // If the product is updated in Directus and the Medusa ID is updated, then we should skip the sync (case when the product is created in diretus and synced to meduasa then after we update the product in directus with the medsuaId, we should skip the sync)

  try {
    console.log(`Updating product ${product.productTitle} to Medusa`);

    const token = await getMedusaAuthToken(); // getting the Medusa auth token

    const authenticatedKy = kyInstance.extend({
      headers: {
        Authorization: `Bearer ${token}`,
        'x-webhook-secret': process.env.WEBHOOK_SECRET,
      },
    }); // extending the ky instance with the Medusa auth token and webhook secret

    const response = await authenticatedKy
      .patch('admin/directus', {
        json: {
          event: 'product.update',
          data: {
            medusaId: fullProduct.medusaID,
            title: product.productTitle || fullProduct.productTitle,
            description: product.productDesc || fullProduct.productDesc,
            handle: product.slug || fullProduct.slug,
            metadata: {
              syncedFrom: 'directus',
              syncId: `directus_sync_${Date.now()}`,
            },
          },
        },
      }) // updating a product in Medusa
      .json<{ id: string }>();

    console.log(`Successfully synced UPDATE product to Medusa : `, response.id);
  } catch (error) {
    console.log(error);
  }
};
