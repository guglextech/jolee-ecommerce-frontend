import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { InventoryComponent } from './inventory/inventory.component';
import { PublishComponent } from './publish/publish.component';
import { BadgesComponent } from './seo-tags/seo-tags.component';
import { ShippingComponent } from './shipping/shipping.component';
import { AllergensComponent } from './variations/variations.component';
import { additionalOptions } from '../../../data/product';

@Component({
  selector: 'app-additional-options',
  standalone: true,
  imports: [
    NgbNavModule,
    InventoryComponent,
    BadgesComponent,
    ShippingComponent,
    AllergensComponent,
    PublishComponent,
  ],
  templateUrl: './additional-options.component.html',
  styleUrl: './additional-options.component.scss',
})
export class AdditionalOptionsComponent {
  @Input() active: number;
  @Output() changeTab = new EventEmitter<number>();

  public additionalOptions = additionalOptions;
  public additionalActiveId: number = 1;

  changeTabDetails(value: number) {
    this.additionalActiveId = value;
  }

  handleChangeTab(value: any) {
    this.changeTab.emit(value);
  }
}
