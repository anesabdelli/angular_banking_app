import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { form, Field, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/loginService';
import { LoginData } from '../../services/login/Login.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [Field],
  changeDetection: ChangeDetectionStrategy.OnPush,})
export class LoginComponent {

  loginSuccess = signal(false);
  loginError = signal<string | null>(null);
  isLoading = signal(false);

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  loginModel = signal<LoginData>({
    codeClient: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.codeClient, { message: 'Code client requis' });
    required(fieldPath.password, { message: 'Mot de passe requis' });
  });

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
          password: loginData.password,
        });

        localStorage.setItem('user', JSON.stringify({
          name: result.name,
          clientCode: result.clientCode
        }));
        
        this.loginSuccess.set(true);

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      } catch (error) {
        this.loginError.set('Code client ou mot de passe incorrect');
        console.error('Login failed', error);
      } finally {
        this.isLoading.set(false);
      }
    });
 }
}
