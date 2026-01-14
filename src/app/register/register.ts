import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  template:`
  <form [formGroup]="form1" (ngSubmit)="onSubmit()">
    <label>Name: </label>
    <input type="text" formControlName="name">
    <br>
    <label>Password: </label>
    <input type="text" formControlName="password">
    <br>
    <button type="submit">submit</button>
  </form>
  `
})

export class Register {
form1 = new FormGroup({
  name: new FormControl('', { nonNullable: true }),
  password: new FormControl('', { nonNullable: true })
});
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  onSubmit() {
  if (this.form1.invalid) return;

  const data = this.form1.getRawValue();
  this.registerService.register(data).subscribe
  ({
    next: (res) => {
      console.log("Register successfully", res);
      console.log("Votre Code Client est : ", res.clientCode);

      setTimeout(() => {
        this.router.navigate(['login'])
        // this.router.navigate(['login'])
      }, 4000);
    },
    error: (err) => {
      console.log("Register error", err);
    }
  });
  }
}
