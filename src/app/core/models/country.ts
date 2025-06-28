import { CountryCode } from '../services/country.service';

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;
}
