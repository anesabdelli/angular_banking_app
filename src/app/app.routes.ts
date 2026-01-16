
import { Routes} from '@angular/router';
import { LoginComponent } from './view/login/login';
import { AccountComponent } from './view/account/account';
import { Register } from './view/register/register';

import { TransactionComponent } from './view/transaction/transaction';
import { DetailTransaction } from './view/transaction/detaisl-transaction/detaisl-transaction';
import { AuthGuard } from '../services/middlewares/authGuard';



export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'transaction', component: TransactionComponent,
    canActivate: [AuthGuard]
  },
  {path: 'detailstransaction', component: DetailTransaction,
    canActivate: [AuthGuard]
  },
  { path: 'account', component: AccountComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component: Register },
  { path: 'transaction/:id', component: DetailTransaction,
    canActivate: [AuthGuard]
  }

];
