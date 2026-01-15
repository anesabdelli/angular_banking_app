import { Injectable } from "@angular/core";
import { TransactionAdapter } from "./transaction.adapter";
import { TransactionDto } from "./transaction.interface";

@Injectable({ providedIn: 'root' })
export class TransactionService{

  constructor(private transactionAdapter : TransactionAdapter){}

  emitTransaction(data: TransactionDto){
    return this.transactionAdapter.emitTransaction(data)
  }

  getTransactionById(id:string){
    return this.transactionAdapter.getTransaction(id)
  }
}
