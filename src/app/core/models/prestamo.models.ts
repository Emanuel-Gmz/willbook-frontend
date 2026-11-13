export interface PrestamoRequest {
  libroId: number;
}

export interface PrestamoResponse {
  idPrestamo: number;
  libroId: number;
  tituloLibro: string;
  codigoEjemplar: string;
  fechaSolicitud: string;
  estado: string;
  mensaje: string;
}

export interface PrestamoPersonal {
  idPrestamo: number;
  libroId: number;
  tituloLibro: string;
  portadaUrl: string;
  codigoEjemplar: string;
  fechaSolicitud: string;
  fechaRetiro: string;
  fechaDevolucionEsperada: string;
  fechaDevolucionReal: string;
  estadoInterno: string;
  estadoVisual: string; 
  atrasado: boolean;
}

export interface PrestamoDetalle {
  idPrestamo: number;
  usuarioId: number;
  nombreLector: string;
  emailLector: string;
  libroId: number;
  tituloLibro: string;
  codigoEjemplar: string;
  fechaSolicitud: string;
  estado: string;
}