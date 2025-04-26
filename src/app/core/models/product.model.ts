/**
 * @property {string} countryCode
 * @property {number} amount
 * @property {string} currency
 */
export interface ProductPrice {
  countryCode: string;
  amount: number;
  currency: string;
}

/**
 * @property {string} id
 * @property {string} url
 * @property {string} alt
 * @property {boolean} isPrimary
 */
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

/**
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} category
 * @property {string} subcategory
 * @property {ProductPrice[]} prices
 * @property {ProductImage[]} images
 * @property {Record<string, any>} attributes
 * @property {number} stock
 * @property {string} sku
 * @property {boolean} isActive
 * @property {string} createdAt
 * @property {string} updatedAt
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  prices: ProductPrice[];
  images: ProductImage[];
  attributes: Record<string, any>;
  stock: number;
  sku: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
