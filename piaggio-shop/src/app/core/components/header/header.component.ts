import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  mainNav = [
    { label: 'Catalog', link: '/catalog' },
    { label: 'Service', link: '/service' },
    { label: 'About Us', link: '/about' },
    { label: 'Blog', link: '/blog' },
    { label: 'Support', link: '/support' },
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
