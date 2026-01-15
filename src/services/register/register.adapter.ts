import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {Injectable} from '@angular/core';
import { User } from "../user/user.interface";
import { RegisterUserInterface, UserInput } from "./register.interface";

@Injectable({providedIn: 'root'})
export class RegisterAdapter implements RegisterUserInterface {
  private readonly baseUrl = "https://coding-bank.fly.dev/auth/register";
  private readonly registerEndPoint = "/api/register";

  constructor(private http: HttpClient) {}

  register(user: UserInput): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }
}
