// src/app/core/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthUser {
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

export interface CustomerProfile {
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
}

export interface RegisterCustomerRequest extends CustomerProfile {
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: AuthUser | null = null;
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private readonly profileStorageKey = 'customer_profile';
  private readonly passwordStorageKey = 'customer_password';

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<AuthUser> {
    return this.http
      .post<{
        token?: string;
        email?: string;
        role?: string;
        user?: { email?: string; username?: string; role?: string; firstName?: string; lastName?: string };
      }>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          const payloadUser = response.user;
          const user: AuthUser = {
            email: payloadUser?.email ?? payloadUser?.username ?? response.email ?? email,
            role: payloadUser?.role ?? response.role ?? 'user',
            firstName: payloadUser?.firstName,
            lastName: payloadUser?.lastName,
          };

          this.currentUser = user;
          localStorage.setItem('user', JSON.stringify(user));
          if (payloadUser?.firstName || payloadUser?.lastName) {
            const existing = this.getProfile();
            this.setProfile({
              firstName: payloadUser?.firstName ?? existing?.firstName ?? '',
              lastName: payloadUser?.lastName ?? existing?.lastName ?? '',
              phone: existing?.phone ?? '',
              addressLine1: existing?.addressLine1 ?? '',
        
              city: existing?.city ?? '',
              postalCode: existing?.postalCode ?? '',
              country: existing?.country ?? '',
              email: user.email,
            });
          }

          if (response.token) {
            localStorage.setItem('auth_token', response.token);
          }

          return user;
        }),
      );
  }

  register(payload: RegisterCustomerRequest): Observable<{ message: string }> {
    const requestBody = {
      email: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phoneNumber: payload.phone,
      address: payload.addressLine1,
      city: payload.city,
      zipCode: payload.postalCode,
      state: payload.country,
    };

    return this.http
      .post(`${this.baseUrl}/register`, requestBody, {
        observe: 'response',
        responseType: 'text',
      })
      .pipe(
        map((response) => {
          let responseMessage: string | undefined;
          if (response.body) {
            try {
              const parsed = JSON.parse(response.body) as { message?: string };
              responseMessage = parsed.message;
            } catch {
              responseMessage = response.body;
            }
          }

          this.setProfile({
            firstName: payload.firstName,
            lastName: payload.lastName,
            phone: payload.phone,
            addressLine1: payload.addressLine1,
            city: payload.city,
            postalCode: payload.postalCode,
            country: payload.country,
            email: payload.email,
          });

          localStorage.setItem(this.passwordStorageKey, payload.password);

          return {
            message: responseMessage ?? 'Registration successful. You can now log in.',
          };
        }),
      );
  }

  getProfile(): CustomerProfile | null {
    const stored = localStorage.getItem(this.profileStorageKey);
    return stored ? JSON.parse(stored) : null;
  }

  updateProfile(profile: CustomerProfile): Observable<{ message: string; profile: CustomerProfile }> {
    this.setProfile(profile);
    if (this.currentUser) {
      this.currentUser = {
        ...this.currentUser,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
      };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
    }
    return of({ message: 'Profile updated successfully.', profile });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<{ message: string }> {
    const existingPassword = localStorage.getItem(this.passwordStorageKey);
    if (existingPassword && existingPassword !== currentPassword) {
      return of({ message: 'Current password is incorrect.' });
    }
    localStorage.setItem(this.passwordStorageKey, newPassword);
    return of({ message: 'Password changed successfully.' });
  }

  getDisplayName(): string {
    const profile = this.getProfile();
    if (profile?.firstName || profile?.lastName) {
      return `${profile.firstName} ${profile.lastName}`.trim();
    }
    return this.getUser()?.email ?? 'My account';
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  getUser(): AuthUser | null {
    if (!this.currentUser) {
      const stored = localStorage.getItem('user');
      this.currentUser = stored ? JSON.parse(stored) : null;
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }

  private setProfile(profile: CustomerProfile): void {
    localStorage.setItem(this.profileStorageKey, JSON.stringify(profile));
  }
}
