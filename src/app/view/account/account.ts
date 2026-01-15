import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Account } from '../../../services/account/account.interface';
import { AccountService } from '../../../services/account/account.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../services/user/user.interface';

// → Ajouts pour les transactions
import { FullTransaction } from '../../../services/account/account.interface';
import { TransactionResponse } from '../../../services/transaction/transaction.interface';
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

  // Création de compte
  showCreateForm = signal(false);
  newAccount = signal<{ label: string; initialBalance: number }>({
    label: '',
    initialBalance: 0
  });
  createLoading = signal(false);
  createError = signal<string | null>(null);

  // Transactions
  transactions = signal<FullTransaction[]>([]);
  transactionsLoading = signal<boolean>(false);
  transactionsError = signal<string | null>(null);

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserAndAccounts();
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
        if (accs.length > 0) {
          this.account.set(accs[0]);
          this.loadTransactions(); // ← on charge les tx du premier compte par défaut
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

  // Chargement des transactions du compte actuellement sélectionné
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
          : 'De ' + `${getInitials(tx.receiver.owner.name)}.`,
      }));

  this.transactions.set(sorted);
      this.transactionsLoading.set(false);
    },

    error: (err) => {
      console.error('Erreur chargement transactions:', err);
      this.transactionsError.set('Impossible de charger les transactions');
      this.transactionsLoading.set(false);
    }
  });
}


    // Récupère l'autre partie de la transaction (émetteur ou receveur)
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

  // Quand on change de compte → recharger les transactions
  onAccountChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const accountId = target.value;

    const selected = this.accounts().find(acc => acc.id === accountId);
    if (selected) {
      this.account.set(selected);
      this.loadTransactions();           // ← important
    }
  }

  // Création de compte (inchangé sauf petite amélioration)
  async createNewAccount(): Promise<void> {
    const data = this.newAccount();

    if (!data.label.trim()) {
      this.createError.set("Le nom du compte est obligatoire");
      return;
    }
    if (data.initialBalance < 0) {
      this.createError.set("Le solde initial ne peut pas être négatif");
      return;
    }

    this.createLoading.set(true);
    this.createError.set(null);

    try {
      const created = await this.accountService.createAccount(data).toPromise();

      this.accountService.getAccounts().subscribe({
        next: (updatedAccounts) => {
          this.accounts.set(updatedAccounts);
          if (created) {
            this.account.set(created);
            this.loadTransactions(); // ← recharge aussi les tx (vide au départ)
          }
        }
      });

      this.closeCreateForm();
    } catch (err: any) {
      this.createError.set(err?.error?.message || "Erreur lors de la création du compte");
    } finally {
      this.createLoading.set(false);
    }
  }

  // Boutons
  onInfosClick(): void {
    alert(this.account()
      ? `Compte ID : ${this.account()!.id}\nSolde : ${this.account()!.balance} €`
      : 'Aucun compte sélectionné');
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
      // Option : scroll vers la section des transactions
      setTimeout(() => {
        document.querySelector('.transactions-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
   }

  onOpenClick(): void {
    this.openCreateForm();
  }


  // Méthodes création compte (inchangées)
  openCreateForm(): void {
    this.newAccount.set({ label: '', initialBalance: 0 });
    this.createError.set(null);
    this.showCreateForm.set(true);
  }

  closeCreateForm(): void {
    this.showCreateForm.set(false);
  }
}
