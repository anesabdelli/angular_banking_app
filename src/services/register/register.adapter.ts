import { Observable } from "rxjs";
import { RegisterUser, User } from "./register.interface";
import { HttpClient } from "@angular/common/http";
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class RegisterAdapter implements RegisterUser {
  private readonly baseUrl = "https://coding-bank.fly.dev/auth/register";
  private readonly registerEndPoint = "/api/register";

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }
}
