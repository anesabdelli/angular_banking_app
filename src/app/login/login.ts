import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
// TODO: Import submit function
import {form, Field, required, email, submit} from '@angular/forms/signals';
import { LoginService } from '../services/login/loginService';
import { LoginData } from '../services/login/Login.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [Field],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class LoginComponent {

 loginSuccess = signal(false);

  constructor(
    private loginService:LoginService,
    private router:Router
  ){}


  loginModel = signal<LoginData>({
    codeClient: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.codeClient, {message: 'codeClient is required'});
    required(fieldPath.password, {message: 'Password is required'});
  });


  // TODO: Add onSubmit method
  onSubmit(event:Event){
    event.preventDefault();

    submit(this.loginForm, async()=>{
      const loginData = this.loginModel();

      try {
        const user = {
          codeClient: loginData.codeClient,
          password: loginData.password
        }
        const result = await this.loginService.loginUser(user);

        localStorage.setItem('token', result.token);
        
        this.loginSuccess.set(true)

        setTimeout(()=>{
          this.router.navigate(['/homepage']);
        }, 1000);

      } catch (error) {
        console.error('Login failed', error);
      }
    })
  }

}
