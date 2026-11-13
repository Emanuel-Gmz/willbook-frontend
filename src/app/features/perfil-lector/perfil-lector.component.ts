import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-lector',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil-lector.component.html',
  styleUrls: ['./perfil-lector.component.css']
})
export class PerfilLectorComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  perfil: any = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  // Buscador de lectores en caso de querer cambiar de perfil
  busquedaQuery: string = '';
  resultadosBusqueda: any[] = [];

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.cargarPerfilLector(+idParam);
    }
  }

  cargarPerfilLector(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.http.get(`http://localhost:8080/api/v1/usuarios/${id}/perfil`).subscribe({
      next: (res) => {
        this.perfil = res;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar perfil de lector', err);
        this.errorMessage = 'No se pudo cargar la información completa del lector.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  buscarLectores(): void {
    if (!this.busquedaQuery || this.busquedaQuery.trim().length < 2) {
      this.resultadosBusqueda = [];
      return;
    }
    this.http.get<any[]>(`http://localhost:8080/api/v1/usuarios/buscar?q=${this.busquedaQuery}`).subscribe({
      next: (res) => {
        this.resultadosBusqueda = res || [];
        this.cdr.detectChanges();
      }
    });
  }

  seleccionarLector(id: number): void {
    this.resultadosBusqueda = [];
    this.busquedaQuery = '';
    this.cargarPerfilLector(id);
  }
}