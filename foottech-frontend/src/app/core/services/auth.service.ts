import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

interface LoginResponse {
  access_token: string;
  expires_in?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'user_token';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!this.getToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    window.addEventListener('storage', (e: StorageEvent) => {
      if (e.key === this.tokenKey) {
        this.isAuthenticatedSubject.next(!!e.newValue);
      }
    });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:3000/api/auth/login', { email, password }).pipe(
      tap(response => {
        if (response?.access_token) {
          localStorage.setItem(this.tokenKey, response.access_token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}