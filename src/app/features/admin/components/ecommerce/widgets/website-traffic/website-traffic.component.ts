import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../sharedComponents/card/card.component';
import { SvgIconComponent } from '../../../header/svg-icon/svg-icon.component';
import { websiteTrafficChart } from 'src/app/features/admin/data/e-commerce';
import { cardToggleOptions4 } from 'src/app/features/admin/data/common';

@Component({
  selector: 'app-website-traffic',
  standalone: true,
  imports: [NgApexchartsModule, CardComponent, SvgIconComponent],
  templateUrl: './website-traffic.component.html',
  styleUrl: './website-traffic.component.scss',
})
export class WebsiteTrafficComponent {
  public cardToggleOption = cardToggleOptions4;
  public websiteTrafficChart = websiteTrafficChart;
}
