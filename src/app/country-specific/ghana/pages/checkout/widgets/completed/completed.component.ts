import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'src/app/features/admin/components/header/svg-icon/svg-icon.component';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss',
})
export class CompletedComponent {
  @Input() type: string = 'simple';
}
