import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { NavService } from '../../../services/nav.service';
import { language } from '../../../data/header';
import { Language } from 'src/app/core/models/header';

@Component({
  selector: 'app-header-language',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-language.component.html',
  styleUrl: './header-language.component.scss',
})
export class HeaderLanguageComponent {
  public languages = language;
  public selectedLanguage: Language;

  constructor(
    public navService: NavService,
    private translate: TranslateService
  ) {
    this.languages.filter((details) => {
      if (details.active) {
        this.selectedLanguage = details;
      }
    });
  }

  selectLanguage(language: Language) {
    this.selectedLanguage = language;
    this.translate.use(language.code);
  }
}
