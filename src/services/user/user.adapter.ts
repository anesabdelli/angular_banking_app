import { Injectable } from '@angular/core';
import { User, UserRepository } from './user.interface';

@Injectable({ providedIn: 'root' })
export class UserAdapter implements UserRepository {
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    console.log('USER FROM STORAGE:', userJson);
    if (!userJson) return null;
    return JSON.parse(userJson) as User;
  }
}
