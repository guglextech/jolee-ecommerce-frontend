import { Component } from '@angular/core';
import { CardComponent } from '../../../sharedComponents/card/card.component';
import { SvgIconComponent } from '../../../header/svg-icon/svg-icon.component';
import { cardToggleOptions3 } from 'src/app/features/admin/data/common';
import { earnings } from 'src/app/features/admin/data/e-commerce';

@Component({
  selector: 'app-payment-gateway-earning',
  standalone: true,
  imports: [CardComponent, SvgIconComponent],
  templateUrl: './payment-gateway-earning.component.html',
  styleUrl: './payment-gateway-earning.component.scss',
})
export class PaymentGatewayEarningComponent {
  public cardToggleOption = cardToggleOptions3;
  public earnings = earnings;
}
