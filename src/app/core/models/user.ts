export interface User {
  id: number;
  username: string;
  name: string;
  apellido: string;
  role: Role;
  fotoUrl?: string;
}

export enum Role {
  LECTOR = 'LECTOR',
  BIBLIOTECARIO = 'BIBLIOTECARIO',
  ADMIN = 'ADMIN'
}