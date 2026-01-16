import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Navbar {
  userLoggedIn = signal<boolean>(false);

  constructor(private router: Router
  ) {
    this.checkSession();
  }



  checkSession() {
    const user = localStorage.getItem('user');
    this.userLoggedIn.set(!!user);
  }

  logout() {
    localStorage.clear();
    this.userLoggedIn.set(false);
    this.router.navigate(['']);
  }

}


//68157621
