import { Component, Input } from '@angular/core';
import { CardComponent } from '../../../sharedComponents/card/card.component';
import { SvgIconComponent } from '../../../header/svg-icon/svg-icon.component';
import { Details } from 'src/app/core/models/default';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CardComponent, SvgIconComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  @Input() details: Details;
}
