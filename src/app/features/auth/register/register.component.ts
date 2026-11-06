import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LocalidadService, LocalidadResponse } from '../../../core/services/localidad.service';
import { RegisterRequest } from '../../../core/models/auth.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private localidadService = inject(LocalidadService);
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

  localidades: LocalidadResponse[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.cargarLocalidades();
  }

  cargarLocalidades(): void {
    this.localidadService.listarLocalidades().subscribe({
      next: (res) => {
        this.localidades = res;
      },
      error: (err) => {
        console.error('Error al cargar localidades', err);
      }
    });
  }

  onSubmit() {
    if (this.registerData.password !== this.registerData.confirmacionPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }
    
    if (!this.registerData.localidadId || Number(this.registerData.localidadId) === 0) {
      this.errorMessage = 'Debe seleccionar una localidad';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.router.navigate(['/catalogo']);
      },
      error: (err) => {
        this.isLoading = false;
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