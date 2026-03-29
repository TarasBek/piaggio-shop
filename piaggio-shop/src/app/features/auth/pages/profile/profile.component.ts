import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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
  profileError = '';
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
    this.profileError = '';
    this.authService.updateProfile(this.profile).subscribe({
      next: (result) => {
        this.profileMessage = result.message;
      },
      error: (error: HttpErrorResponse) => {
        this.profileError =
          this.extractErrorMessage(error) ??
          'Unable to update profile. Please try again.';
      },
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

    this.authService
      .changePassword(this.currentPassword, this.newPassword)
      .subscribe({
        next: (result) => {
          this.passwordMessage = result.message;
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmNewPassword = '';
        },
        error: (error: HttpErrorResponse) => {
          this.passwordError =
            this.extractErrorMessage(error) ??
            'Unable to change password. Please try again.';
        },
      });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  private extractErrorMessage(error: HttpErrorResponse): string | null {
    const payload = error.error;
    if (typeof payload === 'string' && payload.trim()) {
      try {
        const parsed = JSON.parse(payload) as { message?: string };
        if (parsed.message && parsed.message.trim()) {
          return parsed.message;
        }
      } catch {
        return payload;
      }
    }

    if (
      payload &&
      typeof payload === 'object' &&
      'message' in payload &&
      typeof payload.message === 'string' &&
      payload.message.trim()
    ) {
      return payload.message;
    }

    return null;
  }
}
