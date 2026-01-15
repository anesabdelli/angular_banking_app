import { Component, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../../../services/transaction/transaction.service';
import { TransactionResponse } from '../../../../services/transaction/transaction.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { getInitials as getInitialsUtils } from '../../../../services/user/getInitials';

@Component({
  selector: 'app-detaisl-transaction',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './detaisl-transaction.html',
  styleUrls: ['./detaisl-transaction.css'],
})
export class DetailTransaction implements OnInit {

  transaction = signal<TransactionResponse | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private transactionService: TransactionService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTransaction(id);
    }
  }

  loadTransaction(id: string) {
    this.loading.set(true);
    this.error.set(null);

    this.transactionService.getTransactionById(id)
      .then(tx => {
        this.transaction.set(tx);
        this.loading.set(false);
      })
      .catch(err => {
        console.error('Erreur chargement transaction', err);
        this.error.set('Impossible de charger la transaction');
        this.loading.set(false);
      });
  }

  getInitials(name: string): string {
    return getInitialsUtils(name);
  }
}
