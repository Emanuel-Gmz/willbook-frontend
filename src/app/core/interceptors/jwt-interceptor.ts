import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Si hay un token y la petición va hacia nuestra API, lo adjuntamos
  if (token && req.url.includes('/api/v1/')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  } // <--- ¡Aquí faltaba cerrar esta llave!

  // Si no hay token o es una petición externa, sigue su curso normal
  return next(req);
};