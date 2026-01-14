import { Observable } from "rxjs";

export interface User {
  name: string;
  password: string;
}

export interface RegisterUser {
  register(user: User): Observable<User>;
}