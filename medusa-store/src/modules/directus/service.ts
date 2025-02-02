import { Product } from '.medusa/types/query-entry-points';
import {
  authentication,
  AuthenticationClient,
  createDirectus,
  createItem,
  deleteItem,
  DirectusClient,
  readItems,
  rest,
  RestClient,
  updateItem,
} from '@directus/sdk';
import { ConfigManager } from '@medusajs/framework';
import { Logger } from '@medusajs/medusa';

export interface Accessories {
  medusaID: string;
  id: string;
  productTitle: string;
  productDesc: string;
  slug: string;
  metadata: {
    syncedFrom: 'medusa' | 'directus';
    syncId: string;
    lastSyncTimestamp: number;
  }[];
} // Schema for the products in directus.

interface Schema {
  accessories: Accessories[];
} // Assigning the product schema to the collection name for typesafety in the directus client.

export type ModuleOptins = {
  url: string;
  email: string;
  password: string;
}; // Options for the Directus module useful in initializing & authenticating the directus client.

type InjectedDependencies = {
  logger: Logger;
  configModule: ConfigManager;
}; // Injected dependencies useful for configuration in meudusa-config & logger utility.

class DirectusModuleService {
  // private properties for the Directus module service class useful in constructor.
  private options_: ModuleOptins;
  private logger_: Logger;
  private directusClient: DirectusClient<Schema> &
    AuthenticationClient<Schema> &
    RestClient<Schema>;

  private async initializeDirectus() {
    try {
      await this.directusClient.login(
        this.options_.email,
        this.options_.password
      );
      this.logger_.info('Directus client authenticated successfully');
    } catch (error) {
      this.logger_.error('Failed to authenticate Directus client', error);
      throw error;
    }
  } // private method to authenticate the request made to directus.

  async createProductInDirectus(product: Product): Promise<void> {
    try {
      await this.directusClient.request(
        createItem('accessories', {
          slug: `${product.handle}`,
          medusaID: product.id,
          productTitle: product.title,
          productDesc: product.description ?? 'No description provided',
          metadata: [
            {
              syncedFrom: 'medusa',
              syncId: `medusa_sync_${Date.now()}}`,
              lastSyncTimestamp: Date.now(),
            },
          ],
        })
      );
      this.logger_.info(
        `Product with MedusaId: ${product.id}, Title: ${product.title} created in Directus successfully`
      );
    } catch (error) {
      this.logger_.error('Failed to create product in Directus', error);
      throw error;
    }
  } // public method to create a product in directus.

  async deleteProductInDirectus(medusaId: string): Promise<void> {
    try {
      const [directusProduct] = await this.directusClient.request(
        readItems('accessories', {
          fields: ['id'],
          filter: {
            medusaID: {
              _eq: medusaId,
            },
          },
        })
      );

      if (!directusProduct.id) {
        throw new Error(
          `Product with MedusaId: ${medusaId} not found in Directus`
        );
      }

      await this.directusClient.request(
        deleteItem('accessories', directusProduct.id)
      );
      this.logger_.info(
        `Product with MedusaId :  ${medusaId} deleted in Directus successfully`
      );
    } catch (error) {
      this.logger_.error('Failed to delete product in Directus', error);
      throw error;
    }
  } // public method to delete a product in directus.

  async updateProductInDirectus(product: Product): Promise<void> {
    try {
      const [existingDirectusProduct] = await this.directusClient.request(
        readItems('accessories', {
          filter: {
            medusaID: {
              _eq: product.id,
            },
          },
        })
      );

      if (!existingDirectusProduct.id) {
        throw new Error(
          `Product with medusaId: ${product.id} not found in Directus`
        );
      }

      await this.directusClient.request(
        updateItem('accessories', existingDirectusProduct.id, {
          slug: `${product.handle}`,
          medusaID: product.id,
          productTitle: product.title,
          productDesc: product.description ?? 'No description provided',
          metadata: [
            {
              ...(existingDirectusProduct.metadata?.[0] || {}),
              lastSyncTimestamp: Date.now(),
            },
          ],
        })
      );

      this.logger_.info(
        `Product with MedusaId : ${product.id}, Title: ${product.title} updated in Directus successfully`
      );
    } catch (error) {
      this.logger_.error('Failed to update product in Directus', error);
      throw error;
    }
  } // public method to update a product in directus.

  constructor({ logger }: InjectedDependencies, options: ModuleOptins) {
    this.logger_ = logger;
    this.options_ = options;
    this.directusClient = createDirectus<Schema>(options.url)
      .with(authentication())
      .with(rest()); // Creating the directus client with authentication & rest composable.

    this.initializeDirectus().catch(error => {
      this.logger_.error('Failed to initialize Directus module', error);
    }); // Initializing the directus client in the constructor.
  }
} // Directus module service class for creating, deleting, updating accessories in Directus.

export default DirectusModuleService;
