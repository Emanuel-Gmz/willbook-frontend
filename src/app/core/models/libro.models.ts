export interface EjemplarResponse {
  id: number;
  codigoInventario: string;
  estado: string; // 'DISPONIBLE', 'RESERVADO', 'PRESTADO', etc.
}

export interface LibroResponse {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  editorial: string;
  anioPublicacion: number;
  categoria: string;
  portadaUrl: string;
  descripcion: string;
  disponible: boolean;
  ejemplares: EjemplarResponse[];
}