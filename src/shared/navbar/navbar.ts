import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  loadUser = signal<boolean>(false);

  constructor(private router: Router) {
    this.checkSession();
  }

  checkSession() {
    const user = localStorage.getItem('user');
    this.loadUser.set(!!user); // true si user existe
  }

  logout() {
    localStorage.clear();
    this.loadUser.set(false);
    this.router.navigate(['/login']);
  }
}
