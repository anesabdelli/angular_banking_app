import { Injectable } from "@angular/core";
import { RegisterAdapter } from "./register.adapter";
import { User } from "./register.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterProvider {
  constructor(private adapter: RegisterAdapter) {}

  register(user: User): Observable<User> {
    return this.adapter.register(user);
  }
}