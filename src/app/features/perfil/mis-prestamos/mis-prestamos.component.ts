import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamoService } from '../../../core/services/prestamo.service';
import { PrestamoPersonal } from '../../../core/models/prestamo.models';

@Component({
  selector: 'app-mis-prestamos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-prestamos.component.html',
  styleUrls: ['./mis-prestamos.component.css']
})
export class MisPrestamosComponent implements OnInit {
  private prestamoService = inject(PrestamoService);

  prestamos: PrestamoPersonal[] = [];
  prestamosFiltrados: PrestamoPersonal[] = [];
  filtroActual: string = 'todos';
  isLoading: boolean = false;
  mensajeVacio: string = '';

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos(): void {
    this.isLoading = true;
    this.mensajeVacio = '';

    this.prestamoService.consultarMisPrestamos().subscribe({
      next: (res: any) => {
        if (Array.isArray(res)) {
          this.prestamos = res;
          this.prestamosFiltrados = res;
        } else if (res.prestamos) {
          this.prestamos = res.prestamos;
          this.prestamosFiltrados = res.prestamos;
          this.mensajeVacio = res.mensaje;
        }
      },
      error: (err) => {
        console.error('Error al cargar préstamos', err);
        this.mensajeVacio = 'No se pudo cargar tu historial de préstamos.';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  filtrar(tipo: string): void {
    this.filtroActual = tipo;
    if (tipo === 'todos') {
      this.prestamosFiltrados = this.prestamos;
    } else if (tipo === 'activos') {
      this.prestamosFiltrados = this.prestamos.filter(p => 
        p.estadoInterno === 'PRESTADO' || p.estadoInterno === 'RETIRADO' || p.estadoInterno === 'PENDIENTE_RETIRO'
      );
    } else if (tipo === 'historial') {
      this.prestamosFiltrados = this.prestamos.filter(p => 
        p.estadoInterno === 'DEVUELTO' || p.estadoInterno === 'CANCELADO' || p.estadoInterno === 'EXTRAVIADO'
      );
    }
  }

  reportarPerdida(idPrestamo: number): void {
    if (confirm('¿Estás seguro de reportar este libro como extraviado o dañado? Esto generará una sanción administrativa.')) {
      this.prestamoService.reportarPerdida(idPrestamo).subscribe({
        next: (res) => {
          alert('Reporte registrado con éxito.');
          this.cargarPrestamos();
        },
        error: (err) => {
          alert(err.error?.message || 'No se pudo procesar el reporte.');
        }
      });
    }
  }
}