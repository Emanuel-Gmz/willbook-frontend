import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LocalidadResponse {
  id: number;
  nombre: string;
  provincia: string;
  direccionSucursal: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/localidades';

  listarLocalidades(): Observable<LocalidadResponse[]> {
    return this.http.get<LocalidadResponse[]>(this.apiUrl);
  }
}