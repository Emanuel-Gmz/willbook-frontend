import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/auth.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerData: RegisterRequest = {
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: '',
    confirmacionPassword: '',
    localidadId: 0
  };

  // Lista temporal para el select. Luego se consumirá desde LocalidadService.
  localidades = [
    { id: 1, nombre: 'Villa Guillermina' },
    { id: 2, nombre: 'Las Toscas' },
    { id: 3, nombre: 'Reconquista' }
  ];

  errorMessage: string = '';
  isLoading: boolean = false;

  onSubmit() {
    if (this.registerData.password !== this.registerData.confirmacionPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }
    
    if (this.registerData.localidadId === 0) {
      this.errorMessage = 'Debe seleccionar una localidad';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        // Al registrarse exitosamente como lector, lo enviamos al inicio
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        // Capturamos conflictos como Email o DNI duplicados (409) o validaciones (400)
        if (err.status === 409) {
          this.errorMessage = err.error.message || 'El DNI o correo ya se encuentran registrados.';
        } else {
          this.errorMessage = 'Ocurrió un error al procesar el registro.';
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}