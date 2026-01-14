import { Injectable } from '@angular/core';
import { User, UserRepository } from './user.interface';
import { UserAdapter } from './user.adapter';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private adapter: UserAdapter) {}

  getCurrentUser(): User | null {
    return this.adapter.getCurrentUser();
  }
}
