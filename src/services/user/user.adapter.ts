import { Injectable } from '@angular/core';
import { User, UserRepository } from './user.interface';

@Injectable({ providedIn: 'root' })
export class UserAdapter implements UserRepository {
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
     console.log(userJson);
    return JSON.parse(userJson) as User;
  }
}
