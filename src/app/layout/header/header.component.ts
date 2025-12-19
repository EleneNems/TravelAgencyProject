import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showMenu = false;

  constructor(public auth: AuthService, private router: Router) {}

  onProfileClick() {
    if (this.auth.isAuthenticated()) {
      this.showMenu = !this.showMenu;
    } else {
      this.router.navigate(['/auth']);
    }
  }

  logout() {
    this.showMenu = false;
    this.auth.logout();
  }

  get userName() {
    return this.auth.getUserName();
  }
}
