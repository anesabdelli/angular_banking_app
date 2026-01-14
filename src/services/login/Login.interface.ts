
export interface LoginData {
  codeClient: string;
  password: string;
}
export interface ResponseLogin {
  clientCode: string;
  name: string;
  jwt: string;
}
export interface LoginInterface{
  loginUser(loginData: LoginData): Promise<any>
}
