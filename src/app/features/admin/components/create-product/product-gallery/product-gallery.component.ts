import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { SvgIconComponent } from '../../header/svg-icon/svg-icon.component';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [DropzoneModule, SvgIconComponent],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
})
export class ProductGalleryComponent {
  @Input() active: number;
  @Output() changeTab = new EventEmitter<any>();

  public text =
    ' <i class="fa-solid fa-cloud-arrow-up fa-fade"></i><h6>Drop files here or click to upload.</h6><span class="note needsclick">SVG,PNG,JPG <strong>or</strong> GIF</span>';

  public config: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    // addRemoveLinks: true,
  };

  public uploadedFiles: File[] = [];

  onFileAdded(file: File) {
    this.uploadedFiles.push(file);
    // You can now access the uploaded files in this.uploadedFiles
  }

  onFileRemoved(file: File) {
    this.uploadedFiles = this.uploadedFiles.filter((f) => f !== file);
  }

  next() {
    console.log(this.uploadedFiles);
    this.active = this.active + 1;
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        productGallery: this.config,
      },
    });
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        productGallery: this.config,
      },
    });
  }
}
