import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardComponent } from '../../../sharedComponents/card/card.component';
import { SvgIconComponent } from '../../../header/svg-icon/svg-icon.component';
import { cardToggleOptions3 } from 'src/app/features/admin/data/common';
import {
  orderOverviewBarChart,
  orderOverviewChart,
} from 'src/app/features/admin/data/e-commerce';

@Component({
  selector: 'app-order-overview',
  standalone: true,
  imports: [NgApexchartsModule, CardComponent, SvgIconComponent],
  templateUrl: './order-overview.component.html',
  styleUrl: './order-overview.component.scss',
})
export class OrderOverviewComponent {
  public cardToggleOption = cardToggleOptions3;
  public orderOverviewChart = orderOverviewChart;
  public orderOverviewBarChart = orderOverviewBarChart;
}
