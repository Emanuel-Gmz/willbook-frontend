import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AutorResponse {
  id: number;
  nombre: string;
  apellido: string;
  biografia?: string;
  paisOrigen?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/autores';

  listarAutores(query?: string): Observable<AutorResponse[]> {
    let params = new HttpParams();
    if (query && query.trim() !== '') {
      params = params.set('q', query.trim());
    }
    return this.http.get<AutorResponse[]>(this.apiUrl, { params });
  }

  crearAutor(autorData: any): Observable<any> {
    return this.http.post(this.apiUrl, autorData);
  }

  actualizarAutor(id: number, autorData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, autorData);
  }

  eliminarAutor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}