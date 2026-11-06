import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  credentials = {
    username: '',
    password: ''
  };
  errorMessage: string = '';
  isLoading: boolean = false;

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Redirección basada en el rol del usuario
        if (response.rol === 'LECTOR') {
          this.router.navigate(['/catalogo']);
        } else {
          // Si es BIBLIOTECARIO o ADMIN, lo enviamos al panel de gestión de préstamos
          this.router.navigate(['/admin/gestion-prestamos']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else {
          this.errorMessage = 'Ocurrió un error al intentar iniciar sesión';
        }
        this.cdr.detectChanges();
      }
    });
  }
}