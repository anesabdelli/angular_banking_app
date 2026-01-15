import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RegisterService } from '../../../services/register/register.service';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: 'register.html',
  styleUrls: ['register.css']
})

export class Register {
  // Code client affiché après inscription réussie
  clientCode?: string;
  form1 = new FormGroup({
    // Formulaire avec validation des champs requis
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
});
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private cdr: ChangeDetectorRef // Force la mise à jour de la vue
  ) {}

  onSubmit() {
    // Bloque la soumission si le formulaire est invalide
    if (this.form1.invalid) return;
    const data = this.form1.getRawValue();
    this.registerService.register(data).subscribe({
      next: (res) => {
        console.log("Register successfully", res);
        // Récupère et affiche le code client
        this.clientCode = res?.user.clientCode;
        // Force Angular à rafraîchir l'affichage
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['login'])ga
        }, 6000);
      },
      error: (err) => {
        console.log("Register error", err);
      }
    });
  }
}
