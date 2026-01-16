import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account/account.service';


@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account.html',
})
export class CreateAccountComponent {
  newAccount = signal<{ label: string; initialBalance: number }>({
    label: '',
    initialBalance: 0
  });

  createLoading = signal(false);
  createError = signal<string | null>(null);

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

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

      alert("Compte créé avec succès !");
      this.router.navigate(['/account']); // Retour à la page des comptes
    } catch (err: any) {
      this.createError.set(err?.error?.message || "Erreur lors de la création du compte");
    } finally {
      this.createLoading.set(false);
    }
  }

  cancel(): void {
    this.router.navigate(['/account']); // Retour sans créer
  }
}