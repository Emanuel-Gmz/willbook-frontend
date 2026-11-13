import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoriaResponse {
  id: number;
  nombre: string;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/categorias';

  listarCategorias(): Observable<CategoriaResponse[]> {
    return this.http.get<CategoriaResponse[]>(this.apiUrl);
  }

  crearCategoria(categoriaData: any): Observable<any> {
    return this.http.post(this.apiUrl, categoriaData);
  }

  actualizarCategoria(id: number, categoriaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, categoriaData);
  }

  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}