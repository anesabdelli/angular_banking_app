import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterDTO {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export default class RegisterApiService {
  private apiUrl = 'https://coding-bank.fly.dev/auth/register';

  constructor(private http: HttpClient) {}

  registerApi(dto: RegisterDTO): Observable<RegisterDTO> {
    console.log('RegisterApiService: Sending registration data to API', dto);
    return this.http.post<RegisterDTO>(this.apiUrl, dto);
  }
}
