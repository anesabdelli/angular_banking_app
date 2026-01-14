import { Observable } from "rxjs";

export interface Account {
    accountId: string;
    label?: string;
    balance: number;
    createdAt: string;
}

export interface AccountRepository {
  getAccountById(accountId: string): Observable<Account>;
  getAccounts(): Observable<Account[]>;
}