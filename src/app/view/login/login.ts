import { Component, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { form, required, submit } from '@angular/forms/signals';
import { Router, RouterModule } from '@angular/router';
import { LoginData } from '../../../services/login/Login.interface';
import { LoginService } from '../../../services/login/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginSuccess = signal(false);
  loginError = signal<string | null>(null);
  isLoading = signal(false);
  currentField = signal<'codeClient' | 'password'>('codeClient');

  loginModel = signal<LoginData>({ codeClient: '', password: '' });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.codeClient, { message: 'Code client requis' });
    required(fieldPath.password, { message: 'Mot de passe requis' });
  });

  buttons: string[] = ['0','1','2','3','4','5','6','7','8','9',' ',' '];
  shuffledButtons: string[] = [];

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.shuffleButtons();
  }

  shuffleButtons() {
    this.shuffledButtons = this.buttons
      .map(value => ({ value, sort: Math.random() }))
      .sort((a,b) => a.sort - b.sort)
      .map(obj => obj.value);
  }

addDigit(digit: string) {
  const field = this.currentField();
  const currentValue = this.loginModel()[field] || '';

  if (field === 'codeClient') {
    if (currentValue.length < 8) {
      this.loginModel.update(model => ({ ...model, codeClient: currentValue + digit }));
    }
    if (currentValue.length + 1 >= 8) {
      this.currentField.set('password');
    }
  } else {
    if (currentValue.length < 6) {
      this.loginModel.update(model => ({ ...model, password: currentValue + digit }));
    }
  }
}

deleteDigit() {
  const field = this.currentField();
  const currentValue = this.loginModel()[field] || '';

  if (currentValue.length > 0) {
    this.loginModel.update(model => ({
      ...model,
      [field]: currentValue.slice(0, -1)
    }));
  } else if (field === 'password') {
    this.currentField.set('codeClient');
  }
}

clearInput() {
  this.loginModel.set({ codeClient: '', password: '' });
  this.currentField.set('codeClient');
  this.loginError.set(null);
}


  onSubmit(event: Event) {
    event.preventDefault();
    this.loginError.set(null);
    this.isLoading.set(true);

    submit(this.loginForm, async () => {
      if (this.loginForm.codeClient().errors().length > 0) {
        this.isLoading.set(false);
        return;
      }

      const loginData = this.loginModel();
      try {
        const result = await this.loginService.loginUser({
          codeClient: loginData.codeClient,
          password: loginData.password
        });

        localStorage.setItem('jwt', result.jwt);
        localStorage.setItem('user', JSON.stringify(result.user));

        this.loginSuccess.set(true);
       
          this.router.navigate(['/account']);

      } catch (error) {
        this.loginError.set('Code client ou mot de passe incorrect');
        console.error('Login failed', error);
      } finally {
        this.isLoading.set(false);
      }
    });
  }
}
