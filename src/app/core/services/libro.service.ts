import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LibroResponse } from '../models/libro.models';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/catalogo';

  // Obtiene todos los libros o busca por título/autor si se envía un query
  buscarLibros(query?: string): Observable<LibroResponse[] | any> {
    let params = new HttpParams();
    if (query && query.trim() !== '') {
      params = params.set('q', query.trim());
    }
    return this.http.get<LibroResponse[]>(this.apiUrl, { params });
  }

  obtenerLibroPorId(id: number): Observable<LibroResponse> {
    return this.http.get<LibroResponse>(`${this.apiUrl}/${id}`);
  }
}