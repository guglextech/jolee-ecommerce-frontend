import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CardComponent } from '../../../sharedComponents/card/card.component';
import { cardToggleOptions3 } from 'src/app/features/admin/data/common';
import { TableComponent } from '../../../sharedComponents/table/table.component';
import { TableConfigs } from 'src/app/core/models/common';
import { TrendingProducts } from 'src/app/core/models/e-commerce';
import { trendingProducts } from 'src/app/features/admin/data/e-commerce';

@Component({
  selector: 'app-trending-products',
  standalone: true,
  imports: [CardComponent, TableComponent],
  templateUrl: './trending-products.component.html',
  styleUrl: './trending-products.component.scss',
})
export class TrendingProductsComponent {
  public cardToggleOption = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Product Name', field_value: 'product_name', sort: true },
      { title: 'Category', field_value: 'category', sort: true },
      { title: 'Sold', field_value: 'sold_item', sort: true },
    ],
    data: [] as TrendingProducts[],
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    (window as any)['navigateToTrendingProduct'] = () => {
      this.router.navigate(['/product/list']);
    };

    this.tableConfig.data = trendingProducts.map(
      (product: TrendingProducts) => {
        const formattedProduct = { ...product };
        formattedProduct.product_name = this.sanitizer
          .bypassSecurityTrustHtml(`<div class="common-flex align-items-center">
                              <img class="img-fluid rounded-circle" src="${product.product_image}" alt="user">
                              <a class="f-w-500" href="javascript:void(0)" onclick="navigateToTrendingProduct()">${product.product_name}</a>
                            </div>`);

        return formattedProduct;
      }
    );
  }
}
