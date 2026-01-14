import { HttpClient } from "@angular/common/http";
import { Account, AccountRepository } from "./account.interface";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' }) 
export class AccountAdapter implements AccountRepository {
    private readonly apiUrl = 'https://coding-bank.fly.dev/accounts';

    constructor(private http: HttpClient) {}
    
    getAccountById(accountId: string): Observable<Account> {
      return this.http.get<Account>(`${this.apiUrl}/${accountId}`);
    }

    getAccounts(): Observable<Account[]> {
      return this.http.get<Account[]>(this.apiUrl);
    }
}