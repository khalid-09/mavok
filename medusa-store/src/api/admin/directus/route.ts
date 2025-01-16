import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import {
  DeleteAdminDirectusProduct,
  PatchAdminUpdateDirectusProduct,
  PostAdminCreateDirectusProduct,
} from './validation';
import {
  createProductsWorkflow,
  deleteProductsWorkflow,
  updateProductsWorkflow,
} from '@medusajs/medusa/core-flows';

export const POST = async (
  req: MedusaRequest<PostAdminCreateDirectusProduct>,
  res: MedusaResponse
) => {
  const logger = req.scope.resolve('logger'); // Getting the logger from the scope

  logger.info('Validating webhook secret');

  const webhookSecret = req.headers['x-webhook-secret']; // Getting the webhook secret from the headers

  if (!webhookSecret) {
    return res
      .status(400)
      .json({ message: 'Webhook secret header is missing' });
  } // returning a 400 response if the webhook secret is missing

  if (webhookSecret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({
      message: 'Unauthorized, WebHook secret did not match',
    });
  } // returning a 401 response if the webhook secret does not match the one in the environment

  logger.info('Webhook secret is valid');

  logger.info('Creating product...');

  try {
    const { data } = req.validatedBody; // Getting the data from the request body after body validation

    const { result } = await createProductsWorkflow(req.scope).run({
      // Running the createProductsWorkflow with the data from the request body to create the product in Medusa (Directus -> Medusa Sync)
      input: {
        products: [
          {
            title: data.title,
            description: data.description,
            handle: data.handle,
            metadata: {
              syncedFrom: data.metadata.syncedFrom,
              syncId: data.metadata.syncId,
              lastSyncTimestamp: Date.now(),
            },
            status: 'published',
            options: [
              {
                title: 'Default Option',
                values: ['Default option value'],
              },
            ],
            variants: [
              {
                title: 'Default Variant',
              },
            ],
          },
        ],
      },
    });

    logger.info('Product created Successfully');

    const { id } = result[0]; // Getting the id of the created product

    res.status(201).json({ id }); // Returning a 201 response with the id of the created product
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      message: 'Error creating product',
      error: error.message,
    });
  }
}; // USING POST METHOD TO CREATE A PRODUCT

export const DELETE = async (
  req: MedusaRequest<DeleteAdminDirectusProduct>,
  res: MedusaResponse
) => {
  const logger = req.scope.resolve('logger'); // Getting the logger from the scope

  logger.info('Validating webhook secret');

  const webhookSecret = req.headers['x-webhook-secret']; // Getting the webhook secret from the headers

  if (!webhookSecret) {
    return res
      .status(400)
      .json({ message: 'Webhook secret header is missing' });
  } // returning a 400 response if the webhook secret is missing

  if (webhookSecret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({
      message: 'Unauthorized, WebHook secret did not match',
    });
  } // returning a 401 response if the webhook secret does not match the one in the environment

  logger.info('Webhook secret is valid');

  logger.info('Deleting product...');

  try {
    const { data } = req.validatedBody; // Getting the data from the request body after body validation

    const { result } = await deleteProductsWorkflow(req.scope).run({
      input: {
        ids: [data.id],
      },
    }); // Running the deleteProductsWorkflow with the data from the request body to delete the product in Medusa (Directus -> Medusa Sync)

    logger.info('Product deleted Successfully');

    res.status(201).json({ result }); // Returning a 201 response with the result of the delete operation
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      message: 'Error deleting product',
      error: error.message,
    });
  }
}; // USING DELETE METHOD TO DELETE A PRODUCT

export const PATCH = async (
  req: MedusaRequest<PatchAdminUpdateDirectusProduct>,
  res: MedusaResponse
) => {
  const logger = req.scope.resolve('logger'); // Getting the logger from the scope

  logger.info('Validating webhook secret');

  const webhookSecret = req.headers['x-webhook-secret']; // Getting the webhook secret from the headers

  if (!webhookSecret) {
    return res
      .status(400)
      .json({ message: 'Webhook secret header is missing' });
  } // returning a 400 response if the webhook secret is missing

  if (webhookSecret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({
      message: 'Unauthorized, WebHook secret did not match',
    });
  } // returning a 401 response if the webhook secret does not match the one in the environment

  logger.info('Webhook secret is valid');

  logger.info('Updating product...');

  try {
    const { data } = req.validatedBody; // Getting the data from the request body after body validation

    const { result } = await updateProductsWorkflow(req.scope).run({
      input: {
        selector: {
          id: data.medusaId,
        },
        update: {
          title: data.title,
          description: data.description,
          handle: data.handle,
          metadata: {
            syncedFrom: data.metadata.syncedFrom,
            syncId: data.metadata.syncId,
            lastSyncTimestamp: Date.now(),
          },
        },
      },
    }); // Running the updateProductsWorkflow with the data from the request body to update the product in Medusa (Directus -> Medusa Sync)

    logger.info('Product updated Successfully');

    const { id } = result[0]; // Getting the id of the updated product

    res.status(201).json({ id }); // Returning a 201 response with the id of the updated product
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      message: 'Error updating product',
      error: error.message,
    });
  }
}; // USING PATCH METHOD TO UPDATE A PRODUCT
