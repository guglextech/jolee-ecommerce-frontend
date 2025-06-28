import { SafeHtml } from '@angular/platform-browser';
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
export interface ProductOld {
  inStock: boolean;
  discount: number;
  reviews: any[];
  totalQty: number;
  totalSold: number;
  _id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  images?: {
    _id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
  }[];
  prices: [
    {
      _id: string;
      countryCode: string;
      amount: number;
      currency: string;
    },
    {
      _id: string;
      countryCode: string;
      amount: number;
      currency: string;
    }
  ];
  attributes: {
    badges: string[];
    allergens: any[];
    _id: string;
    weight: string;
    ingredients: string;
    organic: boolean;
    isNew?: boolean;
  };
  stock: number;
  sku: string;
  isActive: boolean;
  __v: number;
  metadata: any[];
  qtyLeft: string;
  totalReviews: number;
  averageRating: number | string;
  id: string;
}

export interface IProducts {
  product: Product[];
}

export interface IProduct {
  id: number;
  image: string;
  product_name: SafeHtml;
  sort_description: string;
  description: string;
  discount_price: number;
  price: productPrice[];
  discount?: number;
  tag?: string;
  stock: string;
  review: number;
  category: string;
  rating: any;
  colors: string[];
  size: string[];
  tags: string[];
  sku: string;
  qty: any;
}

export interface productPrice {
  countryCode: string;
  amount: number;
  discount?: number;
  currency: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  categoryId: string;
  subcategory: string;
  metadata: any[];
  attributes: {
    badges: { display: string; value: string }[];
    allergens: { display: string; value: string }[];
    ingredients: { display: string; value: string }[];
    weight: string;
    weightUnit: string;
    organic: boolean;
  };
  prices: {
    countryCode: string;
    amount: number;
    currency: string;
    discount: number;
  }[];
  images: string[];
  quantity: {
    [countryCode: string]: {
      totalQty: number;
      totalSold: number;
    };
  };
  inStock: boolean;
  discount: number;
  user: string;
  reviews: any[];
  url: string;
  __v: number;
  qtyLeft: number | null;
  totalReviews: number;
  averageRating: number | string;
}
