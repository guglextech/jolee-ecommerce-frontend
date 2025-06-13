import { IBaseApiRes } from './apiRes';

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginRes extends IBaseApiRes {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface ILoginRes extends IBaseApiRes, ILoggedInUser {
  token: string;
}
interface ILoggedInUser {
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    province: string;
    phone: number;
  };
  fullname: string;
  email: string;
  orders: unknown[];
  wishLists: unknown[];
  isAdmin: boolean;
  hasShippingAddress: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: number;
}
