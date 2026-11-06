import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-catalogos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-catalogos.component.html',
  styleUrls: ['./gestion-catalogos.component.css']
})
export class GestionCatalogosComponent implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  autores: any[] = [];
  categorias: any[] = [];
  
  nuevoAutor = { nombre: '', apellido: '', biografia: '', paisOrigen: '' };
  nuevaCategoria = { nombre: '', descripcion: '' };

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.http.get<any[]>('http://localhost:8080/api/v1/autores').subscribe(res => { this.autores = res; this.cdr.detectChanges(); });
    this.http.get<any[]>('http://localhost:8080/api/v1/categorias').subscribe(res => { this.categorias = res; this.cdr.detectChanges(); });
  }

  crearAutor(): void {
    this.http.post('http://localhost:8080/api/v1/autores', this.nuevoAutor).subscribe({
      next: () => { alert('Autor registrado con éxito'); this.nuevoAutor = { nombre: '', apellido: '', biografia: '', paisOrigen: '' }; this.cargarDatos(); },
      error: (err) => alert(err.error?.message || 'Error al registrar autor')
    });
  }

  crearCategoria(): void {
    this.http.post('http://localhost:8080/api/v1/categorias', this.nuevaCategoria).subscribe({
      next: () => { alert('Categoría creada con éxito'); this.nuevaCategoria = { nombre: '', descripcion: '' }; this.cargarDatos(); },
      error: (err) => alert(err.error?.message || 'Error al crear categoría')
    });
  }
}