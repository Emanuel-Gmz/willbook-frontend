import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.css']
})
export class NotificationBellComponent implements OnInit {
  private notificationService = inject(NotificationService);
  private cdr = inject(ChangeDetectorRef);

  notificaciones: any[] = [];
  contadorNoLeidas: number = 0;
  mostrarDropdown: boolean = false;

  ngOnInit(): void {
    this.cargarNotificaciones();
    // Opcional: Polling cada 30 segundos para actualizar notificaciones
    setInterval(() => {
      this.cargarNotificaciones();
    }, 30000);
  }

  cargarNotificaciones(): void {
    this.notificationService.obtenerBandeja().subscribe({
      next: (res) => {
        this.notificaciones = res.notificaciones || [];
        this.contadorNoLeidas = res.contadorNoLeidas || 0;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar notificaciones', err)
    });
  }

  toggleDropdown(): void {
    this.mostrarDropdown = !this.mostrarDropdown;
    if (this.mostrarDropdown) {
      this.cargarNotificaciones();
    }
  }

  marcarLeida(id: number): void {
    this.notificationService.marcarComoLeida(id).subscribe({
      next: () => {
        this.cargarNotificaciones();
      }
    });
  }

  marcarTodas(): void {
    this.notificationService.marcarTodasComoLeidas().subscribe({
      next: () => {
        this.cargarNotificaciones();
      }
    });
  }
}