import { Product } from '.medusa/types/query-entry-points';
import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from '@medusajs/framework/workflows-sdk';
import { DIRECTUS_MODULE } from 'src/modules/directus';
import DirectusModuleService from 'src/modules/directus/service';

interface SyncStepInput {
  medusaProductId: string;
  operation: 'created' | 'updated' | 'deleted';
} // input types for the sync step

interface SyncResult {
  operation: 'created' | 'updated' | 'deleted';
  medusaProductId: string;
  medusaProduct?: Product;
} // result types for the StepResponse

interface SyncProductToDirectusInput {
  id: string;
  operation: SyncStepInput['operation'];
} // input types for the workflow passed by the subscriber

const syncProductsToDirectusStep = createStep(
  {
    name: 'sync-products-to-directus',
    async: true,
  },
  async ({ medusaProductId, operation }: SyncStepInput, { container }) => {
    const directusModuleService =
      container.resolve<DirectusModuleService>(DIRECTUS_MODULE); // resolve the DirectusModuleService from the container
    const query = container.resolve('query'); // resolve the DirectusModuleService and query from the container

    let syncResult: SyncResult = {
      operation,
      medusaProductId,
    }; // initialize the syncResult with the operation and medusaProductId

    try {
      if (operation === 'deleted') {
        await directusModuleService.deleteProductInDirectus(medusaProductId);
        return new StepResponse({ success: true }, syncResult);
      } // if the operation is deleted, delete the product from Directus and return success Response

      const { data } = await query.graph({
        entity: 'product',
        fields: ['id', 'title', 'description', 'handle'],
        filters: {
          id: medusaProductId,
        },
      }); // fetch the product from Medusa using the medusaProductId for created and updated operations

      if (!data || data.length === 0) {
        throw new Error(`Product ${medusaProductId} not found in Medusa`);
      } // throw an error if the product is not found in Medusa

      const medusaProduct = data[0]; // get the product from the response

      if (operation === 'created') {
        await directusModuleService.createProductInDirectus(medusaProduct);
      } else {
        await directusModuleService.updateProductInDirectus(medusaProduct);
      } // create or update the product in Directus based on the operation

      syncResult = {
        ...syncResult,
        medusaProduct,
      }; // update the syncResult with the medusaProduct

      return new StepResponse({ success: true }, syncResult); // return success response with the syncResult
    } catch (error) {
      return StepResponse.permanentFailure(
        `Failed to sync product to Directus due to error: ${error}`
      ); // return a permanent failure response if there is an error
    }
  }, // step function to sync the product to Directus
  async (syncResult: SyncResult, { container }) => {
    if (!syncResult) return; // return if there in no error in the stepFunction by checking the syncResult

    const directusModuleService =
      container.resolve<DirectusModuleService>(DIRECTUS_MODULE); // resolve the DirectusModuleService from the container
    directusModuleService.deleteProductInDirectus(syncResult.medusaProductId);
    const logger = container.resolve('logger'); // resolve the logger from the container

    try {
      switch (syncResult.operation) {
        // rollback the product from Directus if the operation is created by deleting the product from Directus in case of error
        case 'created':
          await directusModuleService.deleteProductInDirectus(
            syncResult.medusaProductId
          );
          break;
        // rollback the product from Directus if the operation is updated by updating the product in Directus in case of error
        case 'updated':
          if (!syncResult.medusaProduct) {
            throw new Error('Medusa product not found for update rollback');
          } // throw an error if the medusaProduct is not found
          await directusModuleService.updateProductInDirectus(
            syncResult.medusaProduct
          );
          break;
        // rollback the product from Directus if the operation is deleted in case of error
        case 'deleted':
          await directusModuleService.deleteProductInDirectus(
            syncResult.medusaProductId
          );
      }
    } catch (error) {
      logger.error('Failed to rollback Directus sync', error);
    } // compensation function to rollback the product from Directus in case of error
  }
);

export const syncProductsToDirectusWorkflow = createWorkflow(
  {
    name: 'sync-products-to-directus',
  },
  (input: SyncProductToDirectusInput) => {
    const result = syncProductsToDirectusStep({
      medusaProductId: input.id,
      operation: input.operation,
    }); // calling the syncProductsToDirectusStep with the input

    return new WorkflowResponse(result); // return the result as a WorkflowResponse
  }
); // creating a workflow to sync the product to Directus based on the operation
