import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/ auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

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

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goToAccount(): void {
    this.router.navigate(['/auth/profile']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get accountLabel(): string {
    return this.authService.getDisplayName();
  }

}
