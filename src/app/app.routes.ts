import { Routes, RouterModule } from '@angular/router';

import { Home } from '../features/home/home';
import { Register } from '../features/register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
];