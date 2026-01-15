import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})

export class Register {
  clientCode?: string;
  form1 = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
});
  constructor(
    private registerService: RegisterService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit() {
    if (this.form1.invalid) return;
    const data = this.form1.getRawValue();
    this.registerService.register(data).subscribe({
      next: (res) => {
        console.log("Register successfully", res);
        this.clientCode = res?.user.clientCode;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['login'])
        }, 6000);
      },
      error: (err) => {
        console.log("Register error", err);
      }
    });
  }
}
