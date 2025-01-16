import { defineHook } from '@directus/extensions-sdk';
import { Accessories } from './lib/directus';
import { createProduct, deleteProduct, updateProduct } from './lib/utils';

export default defineHook(({ action, filter }, { env }) => {
  const WEBHOOK_SECRET = env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('WEBHOOK_SECRET environment variable is required');
  } // checking if the webhook secret is set

  action('items.create', async ({ payload, key, collection }) => {
    if (collection !== 'accessories') return; // checking if the collection is accessories
    const product = payload as Accessories; // casting the payload to Accessories

    await createProduct(product, key!); // calling the createProduct function
  }); // creating a product in Medusa

  filter('items.delete', async (input, { collection }) => {
    if (collection !== 'accessories') return; // checking if the collection is accessories
    const [id] = input as string[]; // getting the id of the deleted Product from the input array

    await deleteProduct(id!); // calling the deleteProduct function
  }); // deleting a product in Medusa

  action('items.update', async ({ payload, keys, collection }) => {
    if (collection !== 'accessories') return; // checking if the collection is accessories
    const product = payload as Partial<Accessories>; // casting the payload to Accessories
    const [key] = keys as string[]; // getting the id of updated Product from the keys array

    await updateProduct(product, key!); // calling the updateProduct function
  }); // updating a product in Medusa
});
