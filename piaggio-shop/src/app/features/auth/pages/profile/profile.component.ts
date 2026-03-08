import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CustomerProfile } from '../../../../core/services/ auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profile: CustomerProfile = {
    firstName: '',
    lastName: '',
    phone: '',
    addressLine1: '',

    city: '',
    postalCode: '',
    country: '',
    email: '',
  };
  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  profileMessage = '';
  passwordMessage = '';
  passwordError = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const storedProfile = this.authService.getProfile();
    const user = this.authService.getUser();
    this.profile = {
      ...this.profile,
      ...storedProfile,
      email: storedProfile?.email ?? user?.email ?? '',
      firstName: storedProfile?.firstName ?? user?.firstName ?? '',
      lastName: storedProfile?.lastName ?? user?.lastName ?? '',
    };
  }

  saveProfile(): void {
    this.profileMessage = '';
    this.authService.updateProfile(this.profile).subscribe((result) => {
      this.profileMessage = result.message;
    });
  }

  updatePassword(): void {
    this.passwordError = '';
    this.passwordMessage = '';

    if (!this.newPassword || !this.currentPassword) {
      this.passwordError = 'Current and new password are required.';
      return;
    }
    if (this.newPassword !== this.confirmNewPassword) {
      this.passwordError = 'New password confirmation does not match.';
      return;
    }

    this.authService.changePassword(this.currentPassword, this.newPassword).subscribe((result) => {
      if (result.message.toLowerCase().includes('incorrect')) {
        this.passwordError = result.message;
        return;
      }
      this.passwordMessage = result.message;
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmNewPassword = '';
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
