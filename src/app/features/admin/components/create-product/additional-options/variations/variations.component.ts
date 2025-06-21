import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { TagInputModule } from 'ngx-chips';
import { SvgIconComponent } from '../../../header/svg-icon/svg-icon.component';
import {
  colorOptionName,
  colorOptionValue,
} from 'src/app/features/admin/data/product';

@Component({
  selector: 'app-variations',
  standalone: true,
  imports: [TagInputModule, FormsModule, Select2Module, SvgIconComponent],
  templateUrl: './variations.component.html',
  styleUrl: './variations.component.scss',
})
export class VariationsComponent {
  @Input() additionalActiveId: number;
  @Output() changeTabDetails = new EventEmitter<number>();

  public colors = ['Green', 'Purple', 'Yellow', 'BLue'];
  public colorOptionName = colorOptionName;
  public colorOptionValue = colorOptionValue;

  next() {
    this.additionalActiveId = this.additionalActiveId + 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }

  previous() {
    this.additionalActiveId = this.additionalActiveId - 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }
}
