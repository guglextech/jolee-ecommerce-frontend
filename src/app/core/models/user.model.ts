/**
 * @property {string} id
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} postalCode
 * @property {string} country
 * @property {boolean} isDefault
 *
 */
export interface Address {
  id?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}


/**
 * @property {string} id
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {'customer' | 'admin'} role
 * @property {Address[]} addresses
 * @property {string} phone
 * @property {string} createdAt
 * @property {string} updatedAt
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  phone?: string;
  createdAt: string;
  updatedAt: string;
}
