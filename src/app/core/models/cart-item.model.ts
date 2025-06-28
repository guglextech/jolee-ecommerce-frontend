/**
 * Represents a cart item
 * @property {string} productId
 * @property {string} name
 * @property {number} price
 * @property {string} image
 * @property {number} quantity
 */
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  cartQty?: number; // Quantity in the cart
  available?: number; // Optional field to indicate available stock
}
