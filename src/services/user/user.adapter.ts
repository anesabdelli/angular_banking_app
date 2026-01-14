import { Injectable } from '@angular/core';
import { User, UserRepository } from './user.interface';

@Injectable({ providedIn: 'root' })
export class UserAdapter implements UserRepository {
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Impossible de parser le user depuis localStorage', error);
      return null;
    }
  }
}
