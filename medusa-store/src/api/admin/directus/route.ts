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
  const logger = req.scope.resolve('logger');

  logger.info('Validating webhook secret');

  const webhookSecret = req.headers['x-webhook-secret'];

  if (!webhookSecret) {
    return res
      .status(400)
      .json({ message: 'Webhook secret header is missing' });
  }

  if (webhookSecret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({
      message: 'Unauthorized, WebHook secret did not match',
    });
  }

  logger.info('Webhook secret is valid');

  logger.info('Creating product');

  try {
    const { data } = req.validatedBody;

    const { result } = await createProductsWorkflow(req.scope).run({
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

    const { id } = result[0];

    res.status(201).json({ id });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      message: 'Error creating product',
      error: error.message,
    });
  }
};

export const DELETE = async (
  req: MedusaRequest<DeleteAdminDirectusProduct>,
  res: MedusaResponse
) => {
  const logger = req.scope.resolve('logger');

  logger.info('Validating webhook secret');

  const webhookSecret = req.headers['x-webhook-secret'];

  if (!webhookSecret) {
    return res
      .status(400)
      .json({ message: 'Webhook secret header is missing' });
  }

  if (webhookSecret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({
      message: 'Unauthorized, WebHook secret did not match',
    });
  }

  logger.info('Webhook secret is valid');

  logger.info('Deleting product');

  try {
    const { data } = req.validatedBody;

    const { result } = await deleteProductsWorkflow(req.scope).run({
      input: {
        ids: [data.id],
      },
    });

    logger.info('Product deleted Successfully');

    res.status(201).json({ result });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      message: 'Error deleting product',
      error: error.message,
    });
  }
};

export const PATCH = async (
  req: MedusaRequest<PatchAdminUpdateDirectusProduct>,
  res: MedusaResponse
) => {
  const logger = req.scope.resolve('logger');

  logger.info('Validating webhook secret');

  const webhookSecret = req.headers['x-webhook-secret'];

  if (!webhookSecret) {
    return res
      .status(400)
      .json({ message: 'Webhook secret header is missing' });
  }

  if (webhookSecret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({
      message: 'Unauthorized, WebHook secret did not match',
    });
  }

  logger.info('Webhook secret is valid');

  logger.info('Deleting product');

  try {
    const { data } = req.validatedBody;

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
    });

    logger.info('Product created Successfully');

    const { id } = result[0];

    res.status(201).json({ id });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      message: 'Error updating product',
      error: error.message,
    });
  }
};
