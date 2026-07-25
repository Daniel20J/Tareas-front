import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { ApiResponse } from '../../shared/models/api-response.model';
import { AuthResponse } from '../../shared/models/auth-response.model';
import { LoginRequest } from '../../shared/models/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'https://tareasbackend-iv56.onrender.com/api';
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/loginUsuario`,data).pipe(
        tap(response => {
          if (response.estatus &&response.data &&this.esNavegador()) {
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('usuarioLogin',response.data.usuarioLogin);
            localStorage.setItem('expira',response.data.expira);
          }
        })
      );
  }

  logout(): void {
    if (!this.esNavegador()) return;

    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogin');
    localStorage.removeItem('expira');
  }

  getToken(): string | null {
    if (!this.esNavegador()) return null;
    return localStorage.getItem('token');
  }

  getUsuarioLogin(): string | null {
    if (!this.esNavegador()) return null;
    return localStorage.getItem('usuarioLogin');
  }

  estaAutenticado(): boolean {
    return !!this.getToken();
  }

  private esNavegador(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}