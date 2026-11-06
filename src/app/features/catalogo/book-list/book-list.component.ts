import { Component, OnInit, inject } from '@angular/core';
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
        // El backend puede devolver un array directo o un objeto con "mensaje" y "resultados"
        if (Array.isArray(res)) {
          this.libros = res;
        } else if (res.resultados) {
          this.libros = res.resultados;
          this.mensajeVacio = res.mensaje;
        }
      },
      error: (err) => {
        console.error('Error al cargar catálogo', err);
        this.mensajeVacio = 'Ocurrió un error al cargar el catálogo de libros.';
      },
      complete: () => {
        this.isLoading = false;
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