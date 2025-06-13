import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CardComponent } from '../../../sharedComponents/card/card.component';
import { TableComponent } from '../../../sharedComponents/table/table.component';
import { cardToggleOptions3 } from 'src/app/features/admin/data/common';
import { TableConfigs } from 'src/app/core/models/common';
import { BestSeller } from 'src/app/core/models/e-commerce';
import { bestSeller } from 'src/app/features/admin/data/e-commerce';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CardComponent, TableComponent],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.scss',
})
export class BestSellersComponent {
  public cardToggleOption = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Sellers', field_value: 'seller_name', sort: true },
      { title: 'Company', field_value: 'company_name', sort: true },
      { title: 'Category', field_value: 'category', sort: true },
      { title: 'Earnings', field_value: 'earning', sort: true, type: 'price' },
    ],
    data: [] as BestSeller[],
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    (window as any)['navigateToSeller'] = () => {
      this.router.navigate(['/seller/list']);
    };

    this.tableConfig.data = bestSeller.map((seller: BestSeller) => {
      const formattedSeller = { ...seller };
      formattedSeller.seller_name = this.sanitizer
        .bypassSecurityTrustHtml(`<div class="common-flex align-items-center">
                                <img class="img-fluid rounded-circle" src="${seller.seller_profile}" alt="user">
                                <a class="f-w-500" href="javascript:void(0)" onclick="navigateToSeller()">${seller.seller_name}</a>
                              </div>`);

      return formattedSeller;
    });
  }
}
