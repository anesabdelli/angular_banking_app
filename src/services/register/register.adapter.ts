import { Observable } from "rxjs";
import { RegisterUser, User } from "./register.interface";
import { HttpClient } from "@angular/common/http";

export class RegisterAdapter implements RegisterUser {
  private readonly apiUrl = 'https://coding-bank.fly.dev/auth/register';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}