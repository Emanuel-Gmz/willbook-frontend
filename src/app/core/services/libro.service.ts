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
  private adminUrl = 'http://localhost:8080/api/v1/admin/libros'; // Ajusta según tu endpoint de admin si difiere

  buscarLibros(query?: string): Observable<LibroResponse[]> {
    let params = new HttpParams();
    if (query && query.trim() !== '') {
      params = params.set('q', query.trim());
    }
    return this.http.get<LibroResponse[]>(this.apiUrl, { params });
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

  editarLibro(id: number, libroData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, libroData);
  }

  eliminarLibro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}