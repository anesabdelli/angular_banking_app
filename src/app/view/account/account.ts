import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Account } from '../../../services/account/account.interface';
import { AccountService } from '../../../services/account/account.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../services/user/user.interface';

import { FullTransaction } from '../../../services/account/account.interface';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { firstValueFrom } from 'rxjs';
import { getInitials } from '../../../services/user/getInitials';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class AccountComponent implements OnInit {
  account = signal<Account | null>(null);
  accounts = signal<Account[]>([]);
  user: User | null = null;

  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Transactions
  transactions = signal<FullTransaction[]>([]);
  transactionsLoading = signal<boolean>(false);
  transactionsError = signal<string | null>(null);

  // Countdown : txId → secondes restantes
  countdownMap = signal<Map<string, number>>(new Map());

  // Affichage infos détaillées du compte
  showAccountInfo = signal(false);

  // Clé pour stocker le compte sélectionné dans localStorage
  private readonly SELECTED_ACCOUNT_KEY = 'selectedAccountId';

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserAndAccounts();

    // Mise à jour du countdown toutes les secondes
    setInterval(() => {
      this.updateCountdowns();
    }, 1000);
  }

  // Met à jour les countdowns en live
  private updateCountdowns(): void {
    const now = Date.now();
    const updated = new Map<string, number>();

    for (const tx of this.transactions()) {
      if (tx.status !== 'pending' || tx.emitter?.id !== this.account()?.id) continue;

      const emitted = new Date(tx.emittedAt).getTime();
      const elapsed = Math.floor((now - emitted) / 1000);
      const remaining = 4 - elapsed;

      if (remaining > 0) {
        updated.set(tx.id, remaining);
      }
    }

    this.countdownMap.set(updated);
  }

  async cancelPendingTransaction(txId: string): Promise<void> {
    try {
      await firstValueFrom(this.transactionService.cancelTransaction(txId));
      alert("Transaction annulée avec succès !");
      this.loadTransactions();
    } catch (err: any) {
      console.error("Échec annulation", err);
      alert("Impossible d'annuler la transaction");
    }
  }

  isCancellable(tx: FullTransaction): boolean {
    return this.countdownMap().has(tx.id);
  }

  getCountdown(txId: string): number {
    return this.countdownMap().get(txId) ?? 0;
  }

  hasAnyCancellable(): boolean {
    return this.countdownMap().size > 0;
  }

  private loadUserAndAccounts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.user = this.userService.getCurrentUser();
    if (!this.user) {
      this.error.set('Utilisateur non connecté.');
      this.loading.set(false);
      return;
    }

    this.accountService.getAccounts().subscribe({
      next: (accs: Account[]) => {
        this.accounts.set(accs);

        // Récupère l'ID sauvegardé dans localStorage
        const savedId = localStorage.getItem(this.SELECTED_ACCOUNT_KEY);

        let selected: Account | undefined;
        if (savedId) {
          selected = accs.find(acc => acc.id === savedId);
        }

        // Si pas trouvé ou pas de sauvegarde, prend le premier
        if (!selected && accs.length > 0) {
          selected = accs[0];
        }

        if (selected) {
          this.account.set(selected);
          this.loadTransactions();
        }

        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Impossible de récupérer les comptes.');
        this.loading.set(false);
      }
    });
  }

  private loadTransactions(): void {
    const currentAccount = this.account();
    if (!currentAccount) return;

    this.transactionsLoading.set(true);
    this.transactionsError.set(null);

    this.accountService.getTransactionsByAccount(currentAccount.id).subscribe({
      next: (txs) => {
        const sorted = (txs ?? [])
          .sort((a, b) => new Date(b.emittedAt).getTime() - new Date(a.emittedAt).getTime())
          .slice(0, 5)
          .map(tx => ({
            ...tx,
            displayAmount: tx.emitter.id === currentAccount.id ? -tx.amount : tx.amount,
            otherParty: tx.emitter.id === currentAccount.id
              ? 'Vers ' + `${getInitials(tx.receiver.owner.name)}.`
              : 'De ' + `${getInitials(tx.emitter.owner.name)}.`,
          }));

        this.transactions.set(sorted);
        this.transactionsLoading.set(false);
        this.updateCountdowns();
      },
      error: (err) => {
        console.error('Erreur chargement transactions:', err);
        this.transactionsError.set('Impossible de charger les transactions');
        this.transactionsLoading.set(false);
      }
    });
  }

  getOtherParty(tx: FullTransaction): string {
    const currentAccountId = this.account()?.id;
    if (tx.emitter.id === currentAccountId) return tx.receiver.owner.name;
    return tx.emitter.owner.name;
  }

  getAmount(tx: FullTransaction): string {
    const currentAccountId = this.account()?.id;
    const amount = tx.emitter.id === currentAccountId ? -tx.amount : tx.amount;
    return `${amount} €`;
  }

  goToTransactionDetail(transactionId: string) {
    this.router.navigate(['/transaction', transactionId]);
  }

  onAccountChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const accountId = target.value;

    const selected = this.accounts().find(acc => acc.id === accountId);
    if (selected) {
      this.account.set(selected);
      this.loadTransactions();

      // Sauvegarde l'ID dans localStorage pour persister après refresh/redirection
      localStorage.setItem(this.SELECTED_ACCOUNT_KEY, accountId);
    }
  }

  onInfosClick(): void {
    this.toggleAccountInfo();
  }

  toggleAccountInfo(): void {
    this.showAccountInfo.update(val => !val);
  }

  onSendClick(): void {
    if (this.account()) {
      this.router.navigate(['/transaction'], {
        queryParams: { emitterAccountId: this.account()!.id }
      });
    }
  }

  onViewAllClick(): void {
    this.loadTransactions();
    setTimeout(() => {
      document.querySelector('.transactions-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  onOpenClick(): void {
    this.router.navigate(['/create-account']);
  }
}