export interface AuthRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  password: string;
  confirmacionPassword: string;
  localidadId: number;
}

export interface AuthResponse {
  token: string;
  message: string;
  rol: 'LECTOR' | 'BIBLIOTECARIO' | 'ADMIN';
  nombreCompleto: string;
}