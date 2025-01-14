import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { createProductInDirectusWorkflow } from 'src/workflows/create-sync-product-in-directus';

export default async function productCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await createProductInDirectusWorkflow(container).run({
    input: {
      id: data.id,
    },
  });
} // subscriber function to handle the product created event and call the syncProductToDirectusWorkflow to sync the product to Directus

export const config: SubscriberConfig = {
  event: 'product.created',
}; // subscriber configuration to listen to the product created event
