import { Observable } from "rxjs";

export interface User {
  name: string;
  password: string;
  // codeClient?: string;
}

export interface RegisterUser {
  register(user: User): Observable<User>;
}
