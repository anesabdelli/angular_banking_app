import { Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // <- ajoute ceci

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule], // <- ajoute CommonModule ici
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  loadUser = signal<boolean>(false);

  constructor(private router: Router) {
    this.checkSession();
  }

  checkSession() {
    const user = localStorage.getItem('user');
    this.loadUser.set(!!user);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    this.loadUser.set(false);
    this.router.navigate(['/login']);
  }
}


//68157621
