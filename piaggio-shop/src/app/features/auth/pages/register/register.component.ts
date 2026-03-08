import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService, RegisterCustomerRequest } from '../../../../core/services/ auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  phone = '';
  addressLine1 = '';
  city = '';
  postalCode = '';
  country = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const payload: RegisterCustomerRequest = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      phone: this.phone.trim(),
      addressLine1: this.addressLine1.trim(),
      city: this.city.trim(),
      postalCode: this.postalCode.trim(),
      country: this.country.trim(),
      email: this.email.trim(),
      password: this.password,
    };

    this.isSubmitting = true;
    this.authService.register(payload).subscribe({
      next: (result) => {
        this.isSubmitting = false;
        this.successMessage = result.message;
        this.firstName = '';
        this.lastName = '';
        this.phone = '';
        this.addressLine1 = '';
        this.city = '';
        this.postalCode = '';
        this.country = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        setTimeout(() => this.router.navigate(['/auth/login']), 900);
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.errorMessage =
          error?.error?.message ?? 'Registration failed. Please try again.';
      },
    });
  }

}
