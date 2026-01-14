import { Injectable, ResponseInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom} from "rxjs";
import { LoginData, LoginInterface, ResponseLogin } from "./Login.interface";

@Injectable({ providedIn: 'root' })
export class LoginAdapter implements LoginInterface{

  constructor(private http: HttpClient) {}

  loginUser(user: LoginData): Promise<ResponseLogin> {
  const apiUrl = 'https://coding-bank.fly.dev/auth/login';
   const {codeClient,password} =user
  return firstValueFrom(
    this.http.post<ResponseLogin>(apiUrl, { clientCode:codeClient, password})
  );
  }

}
