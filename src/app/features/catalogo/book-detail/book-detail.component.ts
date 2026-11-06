import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LibroService } from '../../../core/services/libro.service';
import { PrestamoService } from '../../../core/services/prestamo.service';
import { LibroResponse } from '../../../core/models/libro.models';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private libroService = inject(LibroService);
  private prestamoService = inject(PrestamoService);
  private cdr = inject(ChangeDetectorRef); // <-- Inyectamos el detector de cambios

  libro: LibroResponse | null = null;
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.cargarDetalle(+idParam);
    }
  }

  cargarDetalle(id: number): void {
    this.isLoading = true;
    this.libroService.obtenerLibroPorId(id).subscribe({
      next: (res) => {
        this.libro = res;
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- Forzamos la actualización visual
      },
      error: (err) => {
        console.error('Error al cargar detalle del libro', err);
        this.errorMessage = 'No se pudo cargar la información del libro.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  solicitarPrestamo(libroId: number): void {
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.prestamoService.solicitarRetiro({ libroId }).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.successMessage = res.mensaje || '¡Préstamo solicitado con éxito! Revisa "Mis Préstamos".';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/mis-prestamos']);
        }, 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Ocurrió un error al solicitar el préstamo.';
        this.cdr.detectChanges();
      }
    });
  }
}