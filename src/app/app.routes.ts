
import { Routes} from '@angular/router';
import { LoginComponent } from './view/login/login';
import { AccountComponent } from './view/account/account';
import { Register } from './view/register/register';
import { TransactionComponent } from './view/transaction/transaction';
import { TransactionListComponent } from './view/transaction/list/transactions.list';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'transaction', component: TransactionComponent },
  {path: 'transactionslist', component: TransactionListComponent },
  { path: '', component: AccountComponent },
  { path: 'register', component: Register },

];
