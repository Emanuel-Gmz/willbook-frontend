import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LibroService } from '../../../core/services/libro.service';
import { LibroResponse } from '../../../core/models/libro.models';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  private libroService = inject(LibroService);
  private cdr = inject(ChangeDetectorRef); // <-- Inyectamos el detector de cambios

  libros: LibroResponse[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  mensajeVacio: string = '';

  ngOnInit(): void {
    this.cargarCatalogo();
  }

  cargarCatalogo(query?: string): void {
    this.isLoading = true;
    this.mensajeVacio = '';
    
    this.libroService.buscarLibros(query).subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.libros = res;
        } else {
          this.libros = [];
          this.mensajeVacio = 'No se encontraron libros.';
        }
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- Forzamos a la vista a actualizarse y mostrar los libros
      },
      error: (err) => {
        console.error('Error al cargar catálogo', err);
        this.mensajeVacio = 'Ocurrió un error al conectar con el servidor para cargar los libros.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(): void {
    this.cargarCatalogo(this.searchTerm);
  }
  
  limpiarBusqueda(): void {
    this.searchTerm = '';
    this.cargarCatalogo();
  }
}