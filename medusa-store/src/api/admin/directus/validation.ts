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
}); // Defining the schema for the request body

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
}); // Defining the schema for the request body

export type DeleteAdminDirectusProduct = z.infer<
  typeof DeleteAdminDirectusProduct
>;

export const PatchAdminUpdateDirectusProduct = z.object({
  event: z.literal('product.update', {
    required_error: 'Event must be product.create',
  }),
  data: z.object({
    medusaId: z.string().min(1, 'Medusa ID is required'),
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    handle: z.string().min(1, 'Handle is required'),
    metadata: z.object({
      syncedFrom: z.enum(['directus', 'medusa']),
      syncId: z.string().min(1, 'Synced ID is required'),
    }),
  }),
}); // Defining the schema for the request body

export type PatchAdminUpdateDirectusProduct = z.infer<
  typeof PatchAdminUpdateDirectusProduct
>;
