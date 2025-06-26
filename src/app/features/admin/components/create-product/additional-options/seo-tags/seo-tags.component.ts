import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SvgIconComponent } from '../../../header/svg-icon/svg-icon.component';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [AngularEditorModule, SvgIconComponent],
  templateUrl: './seo-tags.component.html',
  styleUrl: './seo-tags.component.scss',
})
export class BadgesComponent {
  @Input() additionalActiveId: number;
  @Output() changeTabDetails = new EventEmitter<number>();

  next() {
    this.additionalActiveId = this.additionalActiveId + 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }

  previous() {
    this.additionalActiveId = this.additionalActiveId - 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }
}
