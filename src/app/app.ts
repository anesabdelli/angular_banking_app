import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar} from '../shared/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar></app-navbar>

    <main class="container mt-4">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}
