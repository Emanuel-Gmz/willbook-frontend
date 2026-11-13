import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // <-- Importante para el routerLink

@Component({
  selector: 'app-gestion-multas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // <-- Añadido aquí
  templateUrl: './gestion-multas.component.html',
  styleUrls: ['./gestion-multas.component.css']
})
export class GestionMultasComponent implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  multas: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  mostrarModalMulta: boolean = false;

  nuevaMulta = {
    usuarioId: 0,
    motivo: '',
    monto: 0
  };
  lectoresBusqueda: any[] = [];
  filtroLector: string = '';

  ngOnInit(): void {
    // Aquí puedes listar multas si lo deseas o dejarlo preparado
  }

  abrirModalMulta(): void {
    this.mostrarModalMulta = true;
    this.cdr.detectChanges();
  }

  cerrarModalMulta(): void {
    this.mostrarModalMulta = false;
    this.cdr.detectChanges();
  }

  buscarLector(query: string): void {
    if (!query || query.trim().length < 2) {
      this.lectoresBusqueda = [];
      return;
    }
    this.http.get<any[]>(`http://localhost:8080/api/v1/usuarios/buscar?q=${query}`).subscribe({
      next: (res) => {
        this.lectoresBusqueda = res || [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error buscando lectores', err)
    });
  }

  registrarMultaManual(): void {
    if (this.nuevaMulta.usuarioId === 0 || !this.nuevaMulta.motivo || this.nuevaMulta.monto <= 0) {
      this.errorMessage = 'Complete todos los campos obligatorios para registrar la multa.';
      this.cdr.detectChanges();
      return;
    }

    this.http.post('http://localhost:8080/api/v1/multas', this.nuevaMulta).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Multa registrada con éxito.';
        this.nuevaMulta = { usuarioId: 0, motivo: '', monto: 0 };
        this.errorMessage = '';
        this.cerrarModalMulta();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'No se pudo registrar la multa.';
        this.cdr.detectChanges();
      }
    });
  }
}