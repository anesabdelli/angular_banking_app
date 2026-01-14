import { Inject, Injectable } from "@angular/core";
import { Account, AccountRepository } from "./account.interface";
import { AccountAdapter } from "./account.adapter";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  constructor(private adapter: AccountAdapter) {}

  getAccountById(accountId: string): Observable<any> {
    return this.adapter.getAccountById(accountId);
  }

  getAccounts(): Observable<Account[]> { 
    return this.adapter.getAccounts();
  }
}   