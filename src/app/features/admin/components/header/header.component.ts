import { Component } from '@angular/core';
import { OutsideDirective } from '../../directives/outside.directive';
import { HeaderLogoComponent } from './header-logo/header-logo.component';
import { HeaderNoticeComponent } from './header-notice/header-notice.component';
import { HeaderLanguageComponent } from './header-language/header-language.component';
import { HeaderCartComponent } from './header-cart/header-cart.component';
import { HeaderNotificationComponent } from './header-notification/header-notification.component';
import { ToggleScreenComponent } from './toggle-screen/toggle-screen.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { SearchComponent } from './search/search.component';
import { ModeComponent } from './mode/mode.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderBookmarkComponent } from './header-bookmark/header-bookmark.component';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    OutsideDirective,
    HeaderLogoComponent,
    HeaderNoticeComponent,
    HeaderLanguageComponent,
    SearchComponent,
    ModeComponent,
    HeaderNotificationComponent,
    ProfileComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private navService: NavService) {}

  toggleLanguage() {
    this.navService.isLanguage = !this.navService.isLanguage;
  }

  clickOutside() {
    this.navService.isLanguage = false;
  }

  openSearch() {
    this.navService.isSearchOpen = true;
  }
}
