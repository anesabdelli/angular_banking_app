import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userLoggedIn = signal<boolean>(false);

  constructor() {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    const user = localStorage.getItem('user');
    this.userLoggedIn.set(!!user);
  }

  isAuthenticated(): boolean {
    return this.userLoggedIn();
  }

  login(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
    this.userLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem('user');
    this.userLoggedIn.set(false);
  }
}
