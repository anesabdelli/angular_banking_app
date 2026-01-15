import { Injectable } from "@angular/core";
import { LoginData} from "./Login.interface";
import { LoginAdapter } from "./login.adapter";

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private loginProvider: LoginAdapter) {}

  loginUser(logindata: LoginData): Promise<any> {
    const user = {
      codeClient: logindata.codeClient,
      password : logindata.password
    }
    return this.loginProvider.loginUser(user);
  }

}
