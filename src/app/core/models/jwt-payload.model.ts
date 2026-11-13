export interface JwtPayload {
  id: number;
  name: string;
  surname: string;
  sub: string;
  rol: string;
  iat: number;
  exp: number;
}