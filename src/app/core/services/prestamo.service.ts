import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrestamoRequest, PrestamoResponse, PrestamoPersonal, PrestamoDetalle } from '../models/prestamo.models';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/prestamos';

  solicitarRetiro(request: PrestamoRequest): Observable<PrestamoResponse> {
    return this.http.post<PrestamoResponse>(`${this.apiUrl}/solicitar`, request);
  }

  consultarMisPrestamos(): Observable<PrestamoPersonal[] | any> {
    return this.http.get<PrestamoPersonal[]>(`${this.apiUrl}/mis-prestamos`);
  }

  listarPendientes(): Observable<PrestamoDetalle[]> {
    return this.http.get<PrestamoDetalle[]>(`${this.apiUrl}/pendientes`);
  }

  confirmarPrestamo(prestamoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${prestamoId}/confirmar`, {});
  }

  cancelarReserva(prestamoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${prestamoId}/cancelar`, {});
  }

  reportarPerdida(prestamoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${prestamoId}/reportar-perdida`, {});
  }
}