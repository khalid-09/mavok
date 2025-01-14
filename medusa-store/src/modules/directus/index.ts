import { Module } from '@medusajs/framework/utils';
import DirectusModuleService from './service';

export const DIRECTUS_MODULE = 'directus'; // defining a constant for the module name

export default Module(DIRECTUS_MODULE, {
  service: DirectusModuleService,
}); // defining a custom module for Directus
