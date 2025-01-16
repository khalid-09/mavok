import {
  defineMiddlewares,
  validateAndTransformBody,
} from '@medusajs/framework/http';
import {
  DeleteAdminDirectusProduct,
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
  ],
});
