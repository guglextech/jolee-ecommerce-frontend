import { IBaseApiRes } from './apiRes';

export interface IProductBrand extends IBaseApiRes {
  brands: IBrandBase[];
}

export interface IBrandBase {
  id: string;
  name: string;
  user: any;
  products: any[];
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
