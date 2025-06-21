import { Product } from './product.model';

export interface Category {
  name: string;
  user: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
  id: string;
  description?: string;
  image?: string;
  category_type?: string;
  color?: string;
}

export interface IProductCategory {
  name: string;
  description: string;
}

export interface IProductCategoryRes {
  status: string;
  message: string;
  category: IProductCategory[];
}

export interface IProductCategoriesRes {
  status: string;
  message: string;
  categories: Product[];
}
