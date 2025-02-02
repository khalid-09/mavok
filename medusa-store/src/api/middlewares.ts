import {
  defineMiddlewares,
  validateAndTransformBody,
} from '@medusajs/framework/http';
import {
  DeleteAdminDirectusProduct,
  PatchAdminUpdateDirectusProduct,
  PostAdminCreateDirectusProduct,
} from './admin/directus/validation';

export default defineMiddlewares({
  routes: [
    {
      matcher: '/admin/directus',
      method: ['POST'],
      middlewares: [validateAndTransformBody(PostAdminCreateDirectusProduct)],
    },
    {
      matcher: '/admin/directus',
      method: ['DELETE'],
      middlewares: [validateAndTransformBody(DeleteAdminDirectusProduct)],
    },
    {
      matcher: '/admin/directus',
      method: ['PATCH'],
      middlewares: [validateAndTransformBody(PatchAdminUpdateDirectusProduct)],
    },
  ],
}); // Defining the middlewares for the admin/directus route methods
