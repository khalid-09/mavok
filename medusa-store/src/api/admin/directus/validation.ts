import { z } from 'zod';

export const PostAdminCreateDirectusProduct = z.object({
  event: z.enum(['product.create', 'product.update', 'product.delete']),
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
