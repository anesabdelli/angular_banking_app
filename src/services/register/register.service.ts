import { Injectable } from "@angular/core";
import { RegisterAdapter } from "./register.adapter";

import { Observable } from "rxjs";
import { User } from "../user/user.interface";
import { UserInput } from "./register.interface";




@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private adapter: RegisterAdapter) {}

  register(userInput: UserInput): Observable<any> {
    return this.adapter.register(userInput);
  }
}
