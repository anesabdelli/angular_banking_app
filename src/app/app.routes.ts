
import { LoginComponent } from './login/login';
import { Routes, RouterModule } from '@angular/router';
import { Register } from './register/register';
import { AccountComponent } from './account/account';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: AccountComponent },
  { path: 'register', component: Register },

];
