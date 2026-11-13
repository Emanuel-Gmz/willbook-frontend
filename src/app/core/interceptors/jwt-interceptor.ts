import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  const router = inject(Router);
  let token = null;

  // 1. Leemos el token directamente del storage para evitar dependencias circulares
  if (isBrowser) {
    token = localStorage.getItem('willbook_token');
  }

  const esApiPropia = req.url.startsWith(environment.apiUrl);
  const esPublicUrl = req.url.includes('/auth/login') ||
                      req.url.includes('/auth/register') ||
                      req.url.includes('/public/') ||
                      (req.method === 'GET' && req.url.includes('/catalogo'));

  let authReq = req;

  if (token && esApiPropia && !esPublicUrl) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // 2. Si da error 401, limpiamos sesión y redirigimos sin usar AuthService
      if (error.status === 401 && esApiPropia && !esPublicUrl) {
        if (isBrowser) {
          localStorage.removeItem('willbook_token');
          localStorage.removeItem('willbook_user');
        }
        router.navigate(['/auth/login']).then(() => {
          // Recargamos la página para limpiar los Signals globales de memoria
          if (isBrowser) window.location.reload(); 
        });
      }
      return throwError(() => error);
    })
  );
};