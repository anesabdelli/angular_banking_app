import { Observable } from "rxjs";

export interface Account {
    id: string;
    label?: string;
    balance: number;
    openAt: string;
    ownerId?: string;
}

export interface CreateAccountDTO {
    label?: string;
    initialBalance: number;
}

export interface AccountRepository {
  getAccountById(accountId: string): Observable<Account>;
  getAccounts(): Observable<Account[]>;
  // methode liée à l'ajout d'autres bank account pour le meme user
  createAccount(data: CreateAccountDTO): Observable<Account>; 
}