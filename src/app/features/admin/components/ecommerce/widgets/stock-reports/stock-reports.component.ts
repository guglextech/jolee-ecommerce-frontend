import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TableConfigs } from 'src/app/core/models/common';
import { TableComponent } from '../../../sharedComponents/table/table.component';
import { CardComponent } from '../../../sharedComponents/card/card.component';
import { cardToggleOptions3 } from 'src/app/features/admin/data/common';
import { StockReport } from 'src/app/core/models/e-commerce';
import { stockReport } from 'src/app/features/admin/data/e-commerce';

@Component({
  selector: 'app-stock-reports',
  standalone: true,
  imports: [CardComponent, TableComponent],
  templateUrl: './stock-reports.component.html',
  styleUrl: './stock-reports.component.scss',
})
export class StockReportsComponent {
  public cardToggleOption = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Items', field_value: 'product_name', sort: true },
      { title: 'Product ID', field_value: 'product_id', sort: true },
      {
        title: 'QTY',
        field_value: 'quantity',
        sort: true,
        type: 'qty',
        text: 'PCS',
      },
      { title: 'Price', field_value: 'price', sort: true, type: 'price' },
      { title: 'Status', field_value: 'status', sort: true },
    ],
    data: [] as StockReport[],
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    (window as any)['navigateToReport'] = () => {
      this.router.navigate(['/reports/products']);
    };

    this.tableConfig.data = stockReport.map((report: StockReport) => {
      const formattedReport = { ...report };
      formattedReport.product_name = this.sanitizer
        .bypassSecurityTrustHtml(`<div class="common-flex align-items-center">
                              <div class="img-border">
                                <img class="img-fluid rounded-circle" src="${report.product_image}" alt="user">
                              </div>
                              <a class="f-w-500" href="javascript:void(0)" onclick="navigateToReport()">${report.product_name}</a>
                            </div>`);

      const statusHTML = `<button class="btn button-light-${report.color} txt-${report.color} f-w-500">${report.status}</button>`;

      formattedReport.status =
        this.sanitizer.bypassSecurityTrustHtml(statusHTML);

      return formattedReport;
    });
  }
}
