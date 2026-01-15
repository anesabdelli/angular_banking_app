import { HttpClient } from "@angular/common/http";
import { EmitTransaction, TransactionDto, TransactionResponse } from "./transaction.interface";
import { firstValueFrom, Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TransactionAdapter implements EmitTransaction{

  constructor(private http: HttpClient){}

  private  emitApiUrl = 'https://coding-bank.fly.dev/transactions/emit';
  private readonly transactionsBaseUrl = 'https://coding-bank.fly.dev/transactions';

  emitTransaction(data: TransactionDto): Promise<TransactionResponse> {
    return firstValueFrom(
      this.http.post<TransactionResponse>(this.emitApiUrl, data)
    ).then((response) => {
      console.log('[TransactionAdapter] réponse API', response);
      return response;
    });
  }

  getTransaction(id: string): Promise<TransactionResponse> {
    const url = `https://coding-bank.fly.dev/transactions/${id}`;
    return firstValueFrom(
      this.http.get<TransactionResponse>(url)
    ).then(response => {
      console.log('[TransactionAdapter] réponse API', response);
      return response;
    });
  }

  cancelTransaction(transactionId: string): Observable<any> {
    const url = `${this.transactionsBaseUrl}/${transactionId}/cancel`;
    return this.http.post(url, {}); 
  }

}

//cfa510da-b18e-4391-81ca-f7cfb19697bd
//ed3dc058-2e6a-458e-b930-18690bbe20e7
