import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { Product } from '.medusa/types/query-entry-points';
import { DIRECTUS_MODULE } from 'src/modules/directus';
import DirectusModuleService from 'src/modules/directus/service';
import { useQueryGraphStep } from '@medusajs/medusa/core-flows';

const syncProductToDirectusStep = createStep(
  'sync-product-to-directus',
  async ({ product }: { product: Product }, { container }) => {
    const directusModuleService: DirectusModuleService =
      container.resolve(DIRECTUS_MODULE);

    const directusProduct = await directusModuleService.createProductInDirectus(
      product
    ); // calling the DirectusModuleService and use the createProductInDirectus method to sync the product to Directus

    return new StepResponse(null, directusProduct.id);
  }, // step function to sync product to Directus by calling the DirectusModuleService and using the createProductInDirectus method
  async (directusProductId: string, { container }) => {
    if (!directusProductId) {
      return;
    } // return if product was successfully synced to Directus

    const directusModuleService: DirectusModuleService =
      container.resolve(DIRECTUS_MODULE);

    directusModuleService.deleteProductInDirectus(directusProductId);
  } // compensation function to delete product in Directus if the step fails using the DirectusModuleService and the deleteProductInDirectus method
); // step function to sync product to Directus

type SyncProductToDirectusInput = {
  id: string;
}; // input type for the syncProductToDirectus workflow

export const syncProductToDirectusWorkflow = createWorkflow(
  'sync-product-to-directus',
  (input: SyncProductToDirectusInput) => {
    // @ts-ignore
    const { data: products } = useQueryGraphStep({
      entity: 'product',
      fields: ['*'],
      filters: {
        id: input.id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    }); // using the useQueryGraphStep to query the product with the given id passed by the subscriber when the product is created

    syncProductToDirectusStep({
      product: products[0],
    }); // calling the syncProductToDirectusStep with the product data from the query

    return new WorkflowResponse({});
  }
); // workflow to sync product to Directus
