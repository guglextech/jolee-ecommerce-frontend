import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Select2Data,
  Select2Module,
  Select2UpdateEvent,
} from 'ng-select2-component';
import { country } from 'src/app/core/data/country';

@Component({
  selector: 'app-address-modal',
  standalone: true,
  imports: [Select2Module],
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.scss',
})
export class AddressModalComponent {
  public country: Select2Data = country;
  public selectedCountry: any = null;
  public states: any[] = [];

  constructor(private modal: NgbActiveModal) {}

  onCountryChange(event: Select2UpdateEvent) {
    const selectedCountryValue = event.value;

    this.selectedCountry = this.country.find(
      (country) => 'value' in country && country.value === selectedCountryValue
    );

    this.states = this.selectedCountry?.data || [];
  }

  closeModal() {
    this.modal.close();
  }
}
