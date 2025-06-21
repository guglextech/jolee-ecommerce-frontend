import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../sharedComponents/card/card.component';
import { topCustomers } from 'src/app/features/admin/data/e-commerce';

@Component({
  selector: 'app-top-customers',
  standalone: true,
  imports: [RouterModule, CardComponent],
  templateUrl: './top-customers.component.html',
  styleUrl: './top-customers.component.scss',
})
export class TopCustomersComponent {
  public topCustomers = topCustomers;
}
