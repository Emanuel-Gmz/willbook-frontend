import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public authService = inject(AuthService);
  private router = inject(Router);

  get usuarioActual() {
    return this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
  }
}