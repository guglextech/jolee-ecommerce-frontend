import { IBaseApiRes } from './apiRes';

export interface ILogin {
  email: string;
  password: string;
}

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  phone: string;
}

export interface ILoggedInUser {
  shippingAddress: IShippingAddress;
  fullname: string;
  email: string;
  orders: any[];
  wishLists: any[];
  isAdmin: boolean;
  hasShippingAddress: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ILoginRes extends IBaseApiRes {
  token: string;
  user: ILoggedInUser;
}

export interface ILoginRes extends IBaseApiRes, ILoggedInUser {
  token: string;
}
export interface ILoggedInUser {
  shippingAddress: IShippingAddress;
  fullname: string;
  email: string;
  orders: any[];
  wishLists: any[];
  isAdmin: boolean;
  hasShippingAddress: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}
