
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  @Input() type: 'border' | 'grow' = 'border';
  @Input() fullscreen: boolean = false;
  @Input() overlay: boolean = false;
  @Input() message: string = '';
  
  get spinnerClasses(): string {
    const classes = [
      `spinner-${this.type}`,
      `text-${this.color}`
    ];
    
    if (this.size === 'sm') {
      classes.push(`spinner-${this.type}-sm`);
    } else if (this.size === 'lg') {
      classes.push('spinner-large');
    }
    
    return classes.join(' ');
  }
}