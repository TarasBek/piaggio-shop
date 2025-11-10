import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  mainNav = [
    { label: 'Home', link: '/home', exact: true },
    { label: 'Catalog', link: '/catalog', exact: false },
    { label: 'Service', link: '/service', exact: false },
    { label: 'Blog', link: '/blog', exact: false },
  ];

  quickLinks = [
    { label: 'Order tracking', link: '/orders' },
    { label: 'Returns & warranty', link: '/returns' },
    { label: 'Dealer program', link: '/dealers' },
  ];

  languages: Array<'EN' | 'DE'> = ['EN', 'DE'];
  selectedLanguage: 'EN' | 'DE' = 'EN';

  selectLanguage(lang: 'EN' | 'DE'): void {
    this.selectedLanguage = lang;
  }

}
