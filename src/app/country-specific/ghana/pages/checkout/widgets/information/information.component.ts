import { Component } from '@angular/core';

// import {
//   Select2Module,
//   Select2Data,
//   Select2UpdateEvent,
// } from 'ng-select2-component';
import { country } from 'src/app/core/data/country';

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
})
export class InformationComponent {
  public country: any = country;
  public selectedCountry: any = null;
  public states: any[] = [];

  onCountryChange(event: any) {
    const selectedCountryValue = event.value;

    this.selectedCountry = this.country.find(
      (country: any) =>
        'value' in country && country.value === selectedCountryValue
    );

    this.states = this.selectedCountry?.data || [];
  }
}
