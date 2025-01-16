import { z } from 'zod';

export const PostAdminCreateDirectusProduct = z.object({
  event: z.literal('product.create', {
    required_error: 'Event must be product.create',
  }),
  data: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    handle: z.string().min(1, 'Handle is required'),
    metadata: z.object({
      syncedFrom: z.enum(['directus', 'medusa']),
      syncId: z.string().min(1, 'Synced ID is required'),
    }),
  }),
});

export type PostAdminCreateDirectusProduct = z.infer<
  typeof PostAdminCreateDirectusProduct
>;

export const DeleteAdminDirectusProduct = z.object({
  event: z.literal('product.delete', {
    required_error: 'Event must be product.delete',
  }),
  data: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
});

export type DeleteAdminDirectusProduct = z.infer<
  typeof DeleteAdminDirectusProduct
>;
