import { Injectable } from "@angular/core";
import { RegisterAdapter } from "./register.adapter";
import { User } from "./register.interface";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private adapter: RegisterAdapter) {}

  register(user: User): Observable<any> {
    return this.adapter.register(user);
  }
}
