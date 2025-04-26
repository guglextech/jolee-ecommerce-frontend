import { CartItem } from './cart-item.model';
import { Address } from './user.model';


/**
 * @type {OrderStatus}
 */
export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

/**
 * @type {PaymentStatus}
 */
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';



/**
 * @interface Order
 * @property {string} id
 * @property {string} userId
 * @property {CartItem[]} items
 * @property {Address} shippingAddress
 * @property {Address} billingAddress
 */
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingMethod: string;
  trackingNumber?: string;
  notes?: string;
  country: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
