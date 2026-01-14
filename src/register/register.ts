import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';


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
  name: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
});

  onSubmit() {
  console.log(this.form1);
  }
}
