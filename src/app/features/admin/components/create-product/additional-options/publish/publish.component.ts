import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';
// import { Select2Module } from 'ng-select2-component';
import { ToastrService } from 'ngx-toastr';
import { SvgIconComponent } from '../../../header/svg-icon/svg-icon.component';
import { publishStatus } from 'src/app/features/admin/data/product';

@Component({
  selector: 'app-publish',
  standalone: true,
  imports: [OwlDateTimeModule, SvgIconComponent],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export class PublishComponent {
  @Input() additionalActiveId: number;
  @Output() changeTabDetails = new EventEmitter<number>();

  public publishStatus = publishStatus;

  constructor(private toast: ToastrService) {}

  next() {
    this.additionalActiveId = this.additionalActiveId + 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }

  previous() {
    this.additionalActiveId = this.additionalActiveId - 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }

  showSuccess() {
    this.toast.success('Submitted successfully');
  }
}
