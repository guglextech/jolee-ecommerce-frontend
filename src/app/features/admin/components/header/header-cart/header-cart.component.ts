import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CartService } from '../../../services/cart.service';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { FeatherIconComponent } from '../../sharedComponents/feather-icon/feather-icon.component';

@Component({
  selector: 'app-header-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, SvgIconComponent, FeatherIconComponent],
  templateUrl: './header-cart.component.html',
  styleUrl: './header-cart.component.scss',
})
export class HeaderCartComponent {
  constructor(public cartService: CartService) {}
}
