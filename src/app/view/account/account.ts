import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

import { Account } from '../../../services/account/account.interface';
import { AccountService } from '../../../services/account/account.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../services/user/user.interface';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class AccountComponent implements OnInit {
  account = signal<Account | null>(null);           // compte sélectionné
  accounts = signal<Account[]>([]);                 // tous les comptes
  user: User | null = null;

  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // ── Nouveaux signaux pour la création ───────────────────────────────
  showCreateForm = signal(false);
  newAccount = signal<{ label: string; initialBalance: number }>({
    label: '',
    initialBalance: 0
  });
  createLoading = signal(false);
  createError = signal<string | null>(null);

  constructor(
    private accountService: AccountService,
    private userService: UserService
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

  // ── Méthodes pour la création de compte ──────────────────────────────
  openCreateForm(): void {
    this.newAccount.set({ label: '', initialBalance: 0 });
    this.createError.set(null);
    this.showCreateForm.set(true);
  }

  closeCreateForm(): void {
    this.showCreateForm.set(false);
  }

  async createNewAccount(): Promise<void> {
    const data = this.newAccount();

    // Validation simple
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
      const created = await this.accountService.createAccount({
        label: data.label,
        initialBalance: data.initialBalance
      }).toPromise();

      // Recharge complète de la liste (solution la plus sûre)
      this.accountService.getAccounts().subscribe({
        next: (updatedAccounts) => {
          this.accounts.set(updatedAccounts);
          // Sélectionne le nouveau compte
          if (created) {
            this.account.set(created);
          }
        }
      });

      this.closeCreateForm();
    } catch (err: any) {
      console.error('Erreur création compte:', err);
      this.createError.set(
        err?.error?.message || "Erreur lors de la création du compte"
      );
    } finally {
      this.createLoading.set(false);
    }
  }

  // Boutons existants
  onInfosClick(): void {
    alert(this.account()
      ? `Compte ID : ${this.account()!.id}\nSolde : ${this.account()!.balance} €`
      : 'Aucun compte sélectionné');
  }

  onSendClick(): void {
    alert('Envoyer argent (non implémenté)');
  }

  onOpenClick(): void {
    this.openCreateForm();
  }

  onViewAllClick(): void {
    alert('Voir tous les comptes (non implémenté)');
  }

  onAccountChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const accountId = target.value;

    const selected = this.accounts().find(acc => acc.id === accountId);
    if (selected) {
      this.account.set(selected);
    }
  }
}