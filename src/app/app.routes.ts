
import { Routes} from '@angular/router';
import { LoginComponent } from './view/login/login';
import { AccountComponent } from './view/account/account';
import { Register } from './view/register/register';

import { TransactionComponent } from './view/transaction/transaction';
import { DetailTransaction } from './view/transaction/detaisl-transaction/detaisl-transaction';
import { CreateAccountComponent } from './view/account/create-account';



export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'transaction', component: TransactionComponent },
  {path: 'detailstransaction', component: DetailTransaction},
  { path: '', component: AccountComponent },
  { path: 'register', component: Register },
  { path: 'transaction/:id', component: DetailTransaction },
  { path: 'create-account', component: CreateAccountComponent }

];
