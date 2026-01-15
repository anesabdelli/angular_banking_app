import { Observable } from "rxjs";
import { User } from "../user/user.interface";

export interface UserInput {
  name: string;
  password: string;
}

export interface RegisterUserInterface {
  register(user: UserInput): Observable<User>;
}
