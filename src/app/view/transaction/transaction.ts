import { Component, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { Field, form, required, submit, min } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import {
  TransactionDto,
  TransactionResponse
} from '../../../services/transaction/transaction.interface';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.html',
  imports: [Field, DatePipe],
  styleUrls: ['./transaction.css'],
})
export class TransactionComponent implements OnInit {

  transactionResult = signal<TransactionResponse | null>(null);
  transactionError = signal<string | null>(null);
  isLoading = signal(false);

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute
  ) {}

  transactionModel = signal<TransactionDto>({
    emitterAccountId: '',
    receiverAccountId: '',
    amount: 0,
    description: '',
  });

  transactionForm = form(this.transactionModel, (fieldPath) => {
    required(fieldPath.emitterAccountId, { message: 'Emitter account is required' });
    required(fieldPath.receiverAccountId, { message: 'Receiver account is required' });
    required(fieldPath.amount, { message: 'Amount is required' });
    min(fieldPath.amount, 1, { message: 'Amount must be greater than 0' });
    required(fieldPath.description, { message: 'Description is required' });
  });

  ngOnInit(): void {
    // Pré-remplissage si queryParam
    const emitterId = this.route.snapshot.queryParamMap.get('emitterAccountId');
    if (emitterId) {
      this.transactionModel.update(model => ({ ...model, emitterAccountId: emitterId }));
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    submit(this.transactionForm, async () => {
      if (this.transactionForm().errors().length > 0) return;

      this.isLoading.set(true);
      this.transactionError.set(null);
      this.transactionResult.set(null);

      try {
        const transaction = this.transactionModel();
        console.log('[TransactionComponent] envoi payload', transaction);

        const response = await this.transactionService.emitTransaction(transaction);
        console.log('[TransactionComponent] réponse API', response);

        this.transactionResult.set(response);

        localStorage.setItem('send', JSON.stringify(response));

      } catch (error: any) {
        this.transactionError.set(error?.message ?? 'Transaction failed');
        console.error('[TransactionComponent] erreur', error);
      } finally {
        this.isLoading.set(false);
      }
    });
  }
}
