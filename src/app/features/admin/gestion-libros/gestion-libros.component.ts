import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LibroService } from '../../../core/services/libro.service';
import { LibroResponse } from '../../../core/models/libro.models';

@Component({
  selector: 'app-gestion-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-libros.component.html',
  styleUrls: ['./gestion-libros.component.css']
})
export class GestionLibrosComponent implements OnInit {
  private libroService = inject(LibroService);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  libros: LibroResponse[] = [];
  autores: any[] = [];
  categorias: any[] = [];

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  mostrarModalLibro: boolean = false;
  mostrarModalEjemplar: boolean = false;

  nuevoLibro = {
    titulo: '',
    autorId: 0,
    isbn: '',
    editorial: '',
    anioPublicacion: new Date().getFullYear(),
    categoriaId: 0,
    portadaUrl: '',
    descripcion: ''
  };

  libroSeleccionado: LibroResponse | null = null;
  nuevoCodigoInventario: string = '';

  ngOnInit(): void {
    this.cargarLibros();
    this.cargarAutoresYCategorias();
  }

  cargarLibros(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.libroService.buscarLibros().subscribe({
      next: (res) => {
        this.libros = res || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar libros', err);
        this.errorMessage = 'No se pudo cargar el inventario de libros.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cargarAutoresYCategorias(): void {
    // Cargamos autores para el desplegable
    this.http.get<any[]>('http://localhost:8080/api/v1/autores').subscribe({
      next: (res) => { this.autores = res; this.cdr.detectChanges(); }
    });
    // Cargamos categorías para el desplegable
    this.http.get<any[]>('http://localhost:8080/api/v1/categorias').subscribe({
      next: (res) => { this.categorias = res; this.cdr.detectChanges(); }
    });
  }

  abrirModalLibro(): void {
    this.mostrarModalLibro = true;
    this.cdr.detectChanges();
  }

  cerrarModalLibro(): void {
    this.mostrarModalLibro = false;
    this.cdr.detectChanges();
  }

  onSubmitCrearLibro(): void {
    if (this.nuevoLibro.autorId === 0 || this.nuevoLibro.categoriaId === 0) {
      this.errorMessage = 'Debe seleccionar un autor y una categoría válidos.';
      this.cdr.detectChanges();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.libroService.crearLibro(this.nuevoLibro).subscribe({
      next: () => {
        this.successMessage = '¡Libro registrado con éxito en el catálogo!';
        this.nuevoLibro = {
          titulo: '',
          autorId: 0,
          isbn: '',
          editorial: '',
          anioPublicacion: new Date().getFullYear(),
          categoriaId: 0,
          portadaUrl: '',
          descripcion: ''
        };
        this.cerrarModalLibro();
        this.cargarLibros();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Ocurrió un error al registrar el libro.';
        this.cdr.detectChanges();
      }
    });
  }

  abrirModalEjemplar(libro: LibroResponse): void {
    this.libroSeleccionado = libro;
    this.nuevoCodigoInventario = '';
    this.mostrarModalEjemplar = true;
    this.cdr.detectChanges();
  }

  cerrarModalEjemplar(): void {
    this.mostrarModalEjemplar = false;
    this.libroSeleccionado = null;
    this.cdr.detectChanges();
  }

  agregarEjemplar(): void {
    if (!this.libroSeleccionado || !this.nuevoCodigoInventario.trim()) return;

    this.libroService.agregarEjemplar(this.libroSeleccionado.id, this.nuevoCodigoInventario.trim()).subscribe({
      next: () => {
        alert('Ejemplar agregado correctamente al inventario.');
        this.cerrarModalEjemplar();
        this.cargarLibros();
      },
      error: (err) => {
        alert(err.error?.message || 'No se pudo agregar el ejemplar.');
      }
    });
  }
}