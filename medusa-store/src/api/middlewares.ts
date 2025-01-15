import {
  defineMiddlewares,
  validateAndTransformBody,
} from '@medusajs/framework/http';
import { PostAdminCreateDirectusProduct } from './admin/directus/validation';

export default defineMiddlewares({
  routes: [
    {
      matcher: '/admin/directus',
      method: ['POST'],
      middlewares: [validateAndTransformBody(PostAdminCreateDirectusProduct)],
    },
  ],
});
