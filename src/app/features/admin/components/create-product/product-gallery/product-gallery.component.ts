import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  DropzoneComponent,
  DropzoneConfigInterface,
  DropzoneModule,
} from 'ngx-dropzone-wrapper';
import { SvgIconComponent } from '../../header/svg-icon/svg-icon.component';
import { ApiService } from '../../../services/api.service';
import { environment } from 'src/environments/environment';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [DropzoneModule, SvgIconComponent],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.scss',
})
export class ProductGalleryComponent implements AfterViewInit {
  @ViewChild('dropzoneRef', { static: false }) dropzone: DropzoneComponent;
  @Input() active: number;
  @Output() changeTab = new EventEmitter<any>();

  public text =
    ' <i class="fa-solid fa-cloud-arrow-up fa-fade"></i><h6>Drop files here or click to upload.</h6><span class="note needsclick">SVG,PNG,JPG <strong>or</strong> GIF</span>';

  public config: DropzoneConfigInterface = {
    url: environment.IMG_UPLOAD_API + '/upload-no-watermark',
    // maxFilesize: 50,
    acceptedFiles: 'image/*',
    paramName: 'file',
  };

  public uploadedFiles: File[] = [];
  imageUrls: string[] = [];

  constructor(private productService: ProductService) {}

  ngAfterViewInit() {
    const form = this.productService.getProductForm().value;
    if (form && form.images && form.images.length) this.imageUrls = form.images;
    if (this.dropzone && this.dropzone.directiveRef && this.imageUrls.length) {
      const dz = this.dropzone.directiveRef.dropzone();

      this.imageUrls.forEach((url, i) => {
        const mockFile = {
          name: `Image ${i + 1}`,
          size: 12345,
          accepted: true,
        };
        dz.emit('addedfile', mockFile);
        dz.emit('thumbnail', mockFile, url);
        dz.emit('complete', mockFile);
        dz.files.push(mockFile);
      });
    }
  }

  onFileAdded(file: File) {
    this.uploadedFiles.push(file);
    // You can now access the uploaded files in this.uploadedFiles
  }

  onFileRemoved(file: File) {
    this.uploadedFiles = this.uploadedFiles.filter((f) => f !== file);
  }

  onUploadError(event: any) {
    // event contains file and error info
    console.error('Upload error:', event);
  }

  onUploadComplete(event: any) {
    // event contains file info
    const file = JSON.parse(event.xhr.response);
    if (file && file.uploadedFiles[0].url)
      this.imageUrls.push(file.uploadedFiles[0].url);
  }

  next() {
    this.active = this.active + 1;
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        images: this.imageUrls,
      },
    });
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit({
      activeTab: this.active,
      formProps: {
        images: this.imageUrls,
      },
    });
  }
}
