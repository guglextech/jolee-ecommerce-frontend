import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CountryService,
  CountryCode,
} from 'src/app/core/services/country.service';

interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  currency: string;
}

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CountrySelectorComponent implements OnInit {
  countries: Country[] = [
    {
      code: 'GH',
      name: 'Ghana',
      flag: 'assets/images/flags/gh.svg',
      currency: 'GHS',
    },
    {
      code: 'US',
      name: 'United States',
      flag: 'assets/images/flags/us.svg',
      currency: 'USD',
    },
  ];

  currentCountry: CountryCode = 'US';
  isDropdownOpen = false;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.country$.subscribe((countryCode) => {
      this.currentCountry = countryCode;
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  changeCountry(country: CountryCode): void {
    if (this.currentCountry !== country) {
      this.countryService.setCountry(country);
    }
    this.closeDropdown();
  }

  getCurrentCountry(): Country {
    return (
      this.countries.find((c) => c.code === this.currentCountry) ||
      this.countries[1]
    );
  }

  // Close dropdown when clicking outside
  onDocumentClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.country-selector')) {
      this.closeDropdown();
    }
  }
}
