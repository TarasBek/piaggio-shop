// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: { username: string; role: string } | null = null;

  login(username: string, password: string): boolean {
    // Mock example — replace with backend API call later
    if (username === 'admin' && password === '1234') {
      this.currentUser = { username, role: 'admin' };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      return true;
    }

    if (username === 'user' && password === '1234') {
      this.currentUser = { username, role: 'user' };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  getUser() {
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
}
