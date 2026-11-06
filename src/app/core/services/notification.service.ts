import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/notificaciones';

  obtenerBandeja(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  marcarComoLeida(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/leer`, {});
  }

  marcarTodasComoLeidas(): Observable<any> {
    return this.http.put(`${this.apiUrl}/marcar-todas`, {});
  }
}