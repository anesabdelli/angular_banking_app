import { DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

interface SendTransactionDetails {
  amount: number;
  receiver: string;
  date: string;
  status: 'pending' | 'success' | 'failed';
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: '../list/transactions.list.html',
  imports: [DatePipe],

})
export class TransactionListComponent implements OnInit {

  sendTransactions = signal<SendTransactionDetails[]>([]);

  ngOnInit(): void {
    this.viewSendTransactions();
  }

  viewSendTransactions(): void {
    const list = localStorage.getItem('transactionDetails');

    if (!list) return;

    try {
      const parsedList: SendTransactionDetails[] = JSON.parse(list);
      this.sendTransactions.set(parsedList);
    } catch (e) {
      console.error('Erreur parsing sendDetails', e);
    }
  }
}
