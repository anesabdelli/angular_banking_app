import { Inject, Injectable } from "@angular/core";
import { Account, AccountRepository, CreateAccountDTO, FullTransaction } from "./account.interface";
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

  createAccount(data: CreateAccountDTO): Observable<Account> {
    return this.adapter.createAccount(data);
  }

    getTransactionsByAccount(accountId: string): Observable<FullTransaction[]> {
    return this.adapter.getTransactionsByAccount(accountId);
  }
}   