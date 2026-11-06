import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LibroResponse } from '../models/libro.models';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/catalogo';
  private adminUrl = 'http://localhost:8080/api/v1/admin/libros'; // Ajusta según tu endpoint de admin si difiere

  buscarLibros(query?: string): Observable<LibroResponse[]> {
    return this.http.get<LibroResponse[]>(this.apiUrl);
  }

  obtenerLibroPorId(id: number): Observable<LibroResponse> {
    return this.http.get<LibroResponse>(`${this.apiUrl}/${id}`);
  }

  crearLibro(libroData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, libroData);
  }

  agregarEjemplar(libroId: number, codigoInventario: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${libroId}/ejemplares`, { codigoInventario });
  }
}