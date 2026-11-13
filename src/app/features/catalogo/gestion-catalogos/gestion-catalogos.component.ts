import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutorService, AutorResponse } from '../../../core/services/autor.service';
import { CategoriaService, CategoriaResponse } from '../../../core/services/categoria.service';

@Component({
  selector: 'app-gestion-catalogos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-catalogos.component.html',
  styleUrls: ['./gestion-catalogos.component.css']
})
export class GestionCatalogosComponent implements OnInit {
  private autorService = inject(AutorService);
  private categoriaService = inject(CategoriaService);
  private cdr = inject(ChangeDetectorRef);

  autores: AutorResponse[] = [];
  categorias: CategoriaResponse[] = [];
  
  successMessage: string = '';
  errorMessage: string = '';

  nuevoAutor = { nombre: '', apellido: '', biografia: '', paisOrigen: '' };
  nuevaCategoria = { nombre: '', descripcion: '' };

  // Control de Modales de Edición
  mostrarModalEditarAutor: boolean = false;
  autorAEditarId: number = 0;
  autorAEditar = { nombre: '', apellido: '', biografia: '', paisOrigen: '' };

  mostrarModalEditarCategoria: boolean = false;
  categoriaAEditarId: number = 0;
  categoriaAEditar = { nombre: '', descripcion: '' };

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.autorService.listarAutores().subscribe({
      next: (res) => { this.autores = res || []; this.cdr.detectChanges(); }
    });

    this.categoriaService.listarCategorias().subscribe({
      next: (res) => { this.categorias = res || []; this.cdr.detectChanges(); }
    });
  }

  // --- AUTORES ---
  crearAutor(): void {
    this.errorMessage = ''; this.successMessage = '';
    this.autorService.crearAutor(this.nuevoAutor).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Autor registrado con éxito';
        this.nuevoAutor = { nombre: '', apellido: '', biografia: '', paisOrigen: '' };
        this.cargarDatos();
      },
      error: (err) => { this.errorMessage = err.error?.message || 'Error al registrar autor'; this.cdr.detectChanges(); }
    });
  }

  abrirModalEditarAutor(autor: AutorResponse): void {
    this.autorAEditarId = autor.id;
    this.autorAEditar = { nombre: autor.nombre, apellido: autor.apellido, biografia: autor.biografia || '', paisOrigen: autor.paisOrigen || '' };
    this.mostrarModalEditarAutor = true;
    this.cdr.detectChanges();
  }

  cerrarModalEditarAutor(): void { this.mostrarModalEditarAutor = false; this.cdr.detectChanges(); }

  onSubmitEditarAutor(): void {
    this.autorService.actualizarAutor(this.autorAEditarId, this.autorAEditar).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Autor actualizado correctamente';
        this.cerrarModalEditarAutor();
        this.cargarDatos();
      },
      error: (err) => { this.errorMessage = err.error?.message || 'No se pudo actualizar el autor'; this.cdr.detectChanges(); }
    });
  }

  eliminarAutor(id: number): void {
    if (confirm('¿Estás seguro de eliminar este autor?')) {
      this.autorService.eliminarAutor(id).subscribe({
        next: (res: any) => { this.successMessage = res.message || 'Autor eliminado correctamente'; this.cargarDatos(); },
        error: (err) => { this.errorMessage = err.error?.message || 'No se pudo eliminar el autor.'; this.cdr.detectChanges(); }
      });
    }
  }

  // --- CATEGORÍAS ---
  crearCategoria(): void {
    this.errorMessage = ''; this.successMessage = '';
    this.categoriaService.crearCategoria(this.nuevaCategoria).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Categoría creada con éxito';
        this.nuevaCategoria = { nombre: '', descripcion: '' };
        this.cargarDatos();
      },
      error: (err) => { this.errorMessage = err.error?.message || 'Error al crear categoría'; this.cdr.detectChanges(); }
    });
  }

  abrirModalEditarCategoria(cat: CategoriaResponse): void {
    this.categoriaAEditarId = cat.id;
    this.categoriaAEditar = { nombre: cat.nombre, descripcion: cat.descripcion || '' };
    this.mostrarModalEditarCategoria = true;
    this.cdr.detectChanges();
  }

  cerrarModalEditarCategoria(): void { this.mostrarModalEditarCategoria = false; this.cdr.detectChanges(); }

  onSubmitEditarCategoria(): void {
    this.categoriaService.actualizarCategoria(this.categoriaAEditarId, this.categoriaAEditar).subscribe({
      next: (res: any) => {
        this.successMessage = res.message || 'Categoría actualizada correctamente';
        this.cerrarModalEditarCategoria();
        this.cargarDatos();
      },
      error: (err) => { this.errorMessage = err.error?.message || 'No se pudo actualizar la categoría'; this.cdr.detectChanges(); }
    });
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaService.eliminarCategoria(id).subscribe({
        next: (res: any) => { this.successMessage = res.message || 'Categoría eliminada correctamente'; this.cargarDatos(); },
        error: (err) => { this.errorMessage = err.error?.message || 'No se pudo eliminar la categoría (puede tener libros asociados).'; this.cdr.detectChanges(); }
      });
    }
  }
}