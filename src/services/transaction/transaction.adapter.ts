import { HttpClient } from "@angular/common/http";
import { EmitTransaction, TransactionDto, TransactionResponse } from "./transaction.interface";
import { firstValueFrom } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TransactionAdapter implements EmitTransaction{

  constructor(private http: HttpClient){}

  emitTransaction(data: TransactionDto): Promise<TransactionResponse>{
     const apiUrl = 'https://coding-bank.fly.dev/transactions/emit';

     const transaction = data;

     return firstValueFrom(
      this.http.post<TransactionResponse>(apiUrl, transaction)
     );

  }
}
