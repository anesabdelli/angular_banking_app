import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Account } from '../../../services/account/account.interface';

import { AccountService } from '../../../services/account/account.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../services/user/user.interface';




@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class AccountComponent implements OnInit {
  account = signal<Account | null>(null);      // compte sélectionné
  accounts = signal<Account[]>([]);           // tous les comptes de l'utilisateur
  user: User | null = null;                   // utilisateur courant
  loading = signal<boolean>(false);           // état loading
  error = signal<string | null>(null);        // message d'erreur

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

    // 1️ Récupérer le user courant depuis localStorage
    this.user = this.userService.getCurrentUser();
    if (!this.user) {
      this.error.set('Utilisateur non connecté.');
      this.loading.set(false);
      return;
    }

    // 2️ Récupérer la liste de ses comptes
    this.accountService.getAccounts().subscribe({
      next: (accs: Account[]) => {
        this.accounts.set(accs);

        // Choisir le compte par défaut (premier de la liste)
        if (accs.length > 0) {
          this.account.set(accs[0]);
        }

        this.loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.error.set('Impossible de récupérer les comptes.');
        this.loading.set(false);
      }
    });
  }

  // Boutons
  onInfosClick(): void {
    alert(this.account()
      ? `Compte ID : ${this.account()!.accountId}\nSolde : ${this.account()!.balance} €`
      : 'Aucun compte sélectionné');

  }

  onSendClick(): void {
    this.router.navigate(['/transaction'],{
      queryParams: {emitterAccountId: this.account()!.accountId}
    })
  }
  onOpenClick(): void { alert('Ouvrir nouveau compte (non implémenté)'); }
  onViewAllClick(): void { alert('Voir tous les comptes (non implémenté)'); }

  // Changement de compte via dropdown
  onAccountChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const accountId = target.value;

  const selected = this.accounts().find(acc => acc.accountId === accountId);
  if (selected) {
    this.account.set(selected);
  }
}

}
