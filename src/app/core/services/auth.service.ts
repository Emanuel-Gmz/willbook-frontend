import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse, RegisterRequest } from '../models/auth.models';
import { JwtPayload } from '../models/jwt-payload.model';
import { Role, User } from '../models/user';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private esBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'willbook_token';
  private userKey = 'willbook_user';

  // Signals reactivos globales
  public token = signal<string | null>(this.leerStorage(this.tokenKey));
  public currentUser = signal<User | null>(this.getUserFromStorage());
  public isAuthenticated = computed(() => !!this.token() && !!this.currentUser());
  public userRole = computed(() => this.currentUser()?.role ?? null);

  // Mantendremos compatibilidad con BehaviorSubject si componentes antiguos lo requieren
  // pero usaremos Signals por defecto.

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.setSession(response))
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => this.setSession(response))
    );
  }

  logout(): void {
    if (this.esBrowser) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.token.set(null);
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return this.token();
  }

  hasRole(requiredRoles: Role[]): boolean {
    const role = this.userRole();
    return role ? requiredRoles.includes(role) : false;
  }

  private setSession(authResult: AuthResponse): void {
    if (this.esBrowser) {
      localStorage.setItem(this.tokenKey, authResult.token);
    }
    const user = this.buildUserFromToken(authResult.token, authResult);
    if (user && this.esBrowser) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
    this.token.set(authResult.token);
    this.currentUser.set(user);
  }

  private getUserFromStorage(): User | null {
  try {
    const userJson = this.leerStorage(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  } catch {
    return null;
  }
}

  private buildUserFromToken(token: string, fallback: AuthResponse): User | null {
    const payload = this.getPayload(token);
    if (!payload) {
      return {
        id: 0,
        username: '',
        name: fallback.nombreCompleto,
        apellido: '',
        role: fallback.rol as Role
      };
    }
    return {
      id: payload.id,
      username: payload.sub,
      name: payload.name,
      apellido: payload.surname,
      role: (payload.rol || fallback.rol) as Role
    };
  }

  private getPayload(token?: string): JwtPayload | null {
  
  const jwt = token ?? this.leerStorage(this.tokenKey);
  if (!jwt) return null;
  try {
    const base64 = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

  private leerStorage(key: string): string | null {
    return this.esBrowser ? localStorage.getItem(key) : null;
  }
}