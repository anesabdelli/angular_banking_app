import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RegisterUser, User } from './register.interface';
import RegisterApiService, { RegisterDTO } from './register.provider';

@Injectable({
  providedIn: 'root'
})
export class RegisterAdapterService implements RegisterUser {
  constructor(private apiService: RegisterApiService) {}

  register(user: User): Observable<User> {
    const dto: User = { name: user.name, password: user.password };

    return this.apiService.registerApi(dto).pipe(
      map((res: User) => ({
        name: res.name,
        password: res.password
      }))
    );
  }
}
