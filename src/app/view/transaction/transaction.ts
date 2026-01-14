import { Component, signal } from '@angular/core';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { Field, form, required, submit } from '@angular/forms/signals';
import { TransactionDto } from '../../../services/transaction/transaction.interface';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.html',
  imports: [Field],
  styleUrl: './transaction.css',
})
export class Transaction {

  transactionSuccess = signal(false);
  transactionError = signal<string | null>(null);
  isLoading = signal(false);

  constructor(private transactionService: TransactionService) {}


  transactionModel = signal<TransactionDto>({
    emitterAccountId: '',
    receiverAccountId: '',
    amount: 0,
    description: ''
  });


  transactionForm = form(this.transactionModel, (fieldPath) => {
    required(fieldPath.emitterAccountId, { message: 'Emitter account is required' });
     required(fieldPath.receiverAccountId, { message: 'Receiver account is required' });
     required(fieldPath.amount, { message: 'Amount is required' });
    required(fieldPath.description, { message: 'Description is required' });
  });


  onSubmit(event: Event) {
    event.preventDefault();

    this.transactionError.set(null);
     this.transactionSuccess.set(false);
    this.isLoading.set(true);

    submit(this.transactionForm, async () => {
      if (this.transactionForm().errors().length > 0) {
        this.isLoading.set(false);
        return;
      }

      try {
        const transaction = this.transactionModel();

        await this.transactionService.emitTransaction(transaction);

        this.transactionSuccess.set(true);

      } catch (error) {
        this.transactionError.set('Transaction failed');
        console.error(error);
      } finally {
        this.isLoading.set(false);
      }
    });
  }
}
