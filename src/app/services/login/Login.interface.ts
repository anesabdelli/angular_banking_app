
export interface LoginData {
  codeClient: string;
  password: string;
}
export interface ResponseLogin {
  clientCode: string;
  name: string;
  token: string;
}
export interface LoginInterface{
  loginUser(loginData: LoginData): Promise<any>
}
