import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CountryService,
  CountryCode,
} from 'src/app/core/services/country.service';
import { Country } from 'src/app/core/models/country';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CountrySelectorComponent implements OnInit {
  currentCountry: CountryCode = 'US';
  isDropdownOpen = false;

  constructor(public countryService: CountryService) {}

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
      this.countryService.countries.find(
        (c) => c.code === this.currentCountry
      ) || this.countryService.countries[1]
    );
  }

  // Close dropdown when clicking outside
  onDocumentClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.country-selector')) {
      this.closeDropdown();
    }
  }
}
