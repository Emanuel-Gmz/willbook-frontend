import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamoService } from '../../../core/services/prestamo.service';
import { PrestamoDetalle } from '../../../core/models/prestamo.models';

@Component({
  selector: 'app-gestion-prestamos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-prestamos.component.html',
  styleUrls: ['./gestion-prestamos.component.css']
})
export class GestionPrestamosComponent implements OnInit {
  private prestamoService = inject(PrestamoService);
  private cdr = inject(ChangeDetectorRef);

  prestamosPendientes: PrestamoDetalle[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit(): void {
    this.cargarPendientes();
  }

  cargarPendientes(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.prestamoService.listarPendientes().subscribe({
      next: (res: PrestamoDetalle[]) => {
        this.prestamosPendientes = res || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar préstamos pendientes', err);
        this.errorMessage = 'No se pudieron cargar las solicitudes pendientes.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  confirmarPrestamo(id: number): void {
    if (confirm('¿Confirmar la entrega física de este ejemplar al lector?')) {
      this.prestamoService.confirmarPrestamo(id).subscribe({
        next: () => {
          this.successMessage = 'Préstamo confirmado y registrado como retirado con éxito.';
          this.cargarPendientes();
          this.cdr.detectChanges();
        },
        error: (err) => {
          alert(err.error?.message || 'No se pudo confirmar el préstamo.');
        }
      });
    }
  }

  cancelarReserva(id: number): void {
    if (confirm('¿Estás seguro de cancelar esta solicitud de reserva?')) {
      this.prestamoService.cancelarReserva(id).subscribe({
        next: () => {
          this.successMessage = 'Reserva cancelada correctamente.';
          this.cargarPendientes();
          this.cdr.detectChanges();
        },
        error: (err) => {
          alert(err.error?.message || 'No se pudo cancelar la reserva.');
        }
      });
    }
  }
}