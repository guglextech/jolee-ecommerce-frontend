import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AngularEditorConfig,
  AngularEditorModule,
} from '@kolkov/angular-editor';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '../../header/svg-icon/svg-icon.component';

@Component({
  selector: 'app-add-product-details',
  standalone: true,
  imports: [
    CommonModule,
    AngularEditorModule,
    SvgIconComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-product-details.component.html',
  styleUrl: './add-product-details.component.scss',
})
export class AddProductDetailsComponent {
  @Input() active: number;
  @Output() changeTab = new EventEmitter<any>();

  productDetailsForm: any;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200px',
    maxHeight: '250px',
    width: 'auto',
    toolbarHiddenButtons: [['unorderedList'], ['fontSize']],
  };

  constructor(private fb: FormBuilder) {
    this.productDetailsForm = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  ngOnInit() {
    this.active;
  }

  next() {
    this.active = this.active + 1;
    this.changeTab.emit({
      activeTab: this.active,
      formProps: this.productDetailsForm.value,
    });
  }
}
