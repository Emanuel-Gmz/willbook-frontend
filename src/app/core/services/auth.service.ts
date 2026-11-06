import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthRequest, AuthResponse, RegisterRequest } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private tokenKey = 'willbook_token';
  private userKey = 'willbook_user';

  // Estado reactivo para que el menú de navegación reaccione en tiempo real
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

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
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem(this.tokenKey, authResult.token);
    // Guardamos el resto de los datos (rol, nombre) para usarlos en la UI sin decodificar el token
    const userData = { ...authResult, token: '' }; 
    localStorage.setItem(this.userKey, JSON.stringify(userData));
    this.currentUserSubject.next(authResult);
  }

  private getUserFromStorage(): AuthResponse | null {
    const userJson = localStorage.getItem(this.userKey);
    const token = this.getToken();
    if (userJson && token) {
      const user = JSON.parse(userJson);
      user.token = token;
      return user;
    }
    return null;
  }
}