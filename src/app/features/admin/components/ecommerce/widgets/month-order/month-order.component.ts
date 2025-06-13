import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardComponent } from '../../../sharedComponents/card/card.component';
import { cardToggleOptions3 } from 'src/app/features/admin/data/common';
import { monthOrderChart } from 'src/app/features/admin/data/e-commerce';

@Component({
  selector: 'app-month-order',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, CardComponent],
  templateUrl: './month-order.component.html',
  styleUrl: './month-order.component.scss',
})
export class MonthOrderComponent {
  public cardToggleOption = cardToggleOptions3;
  public orderChart = monthOrderChart;
}
