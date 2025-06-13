import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardComponent } from '../../../sharedComponents/card/card.component';
import { cardToggleOptions3 } from 'src/app/features/admin/data/common';
import { monthlyProfitsChart } from 'src/app/features/admin/data/e-commerce';

@Component({
  selector: 'app-monthly-profits',
  standalone: true,
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './monthly-profits.component.html',
  styleUrl: './monthly-profits.component.scss',
})
export class MonthlyProfitsComponent {
  public cardToggleOption = cardToggleOptions3;
  public profitChart = monthlyProfitsChart;
}
