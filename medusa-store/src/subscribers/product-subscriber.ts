// mavok/medusa-store/src/subscribers/product-subscriber.ts
import { SubscriberArgs, SubscriberConfig } from '@medusajs/framework';
import { syncProductsToDirectusWorkflow } from 'src/workflows/sync-product-to-directus';

export default async function productSubscriptionHandler({
  event: { data, name },
  container,
}: SubscriberArgs<{ id: string }>) {
  const operation = name.split('.')[1] as 'created' | 'deleted' | 'updated';

  await syncProductsToDirectusWorkflow(container).run({
    input: {
      id: data.id,
      operation: operation,
    },
  });
} // subscriber function to handle the product created event and call the syncProductToDirectusWorkflow to sync the product to Directus

export const config: SubscriberConfig = {
  event: ['product.created', 'product.deleted', 'product.updated'],
}; // subscriber configuration to listen to the product created, deleted, and updated events
