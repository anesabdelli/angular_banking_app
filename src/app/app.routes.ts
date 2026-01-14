
import { Routes} from '@angular/router';
import { LoginComponent } from './view/login/login';
import { Transaction } from './view/transaction/transaction';
import { AccountComponent } from './account/account';
import { Register } from './register/register';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'transaction', component: Transaction },
  { path: '', component: AccountComponent },
  { path: 'register', component: Register },

];
