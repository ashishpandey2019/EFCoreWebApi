import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  username: string;
  role: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgetPasswordRequest {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.loadUserFromStorage();
  }

  register(username: string, password: string, role: string = 'Customer'): Observable<any> {
    return this.http.post(`${this.API_URL}/register?role=${role}`, { username, password }, {
      responseType: 'text'
    });
  }

  login(request: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, request).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
      })
    );
  }

  refresh(refreshToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/refresh`, { refreshToken }).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
      })
    );
  }

  logout(refreshToken: string): Observable<any> {
    return this.http.post(`${this.API_URL}/logout`, { refreshToken }).pipe(
      tap(() => {
        this.clearAllData();
      })
    );
  }

  logoutLocal(): void {
    // Local logout without API call (in case API fails)
    this.clearAllData();
  }

  private clearAllData(): void {
    // Clear session service data
    this.sessionService.clearAllSessionData();
    
    // Clear all localStorage data
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    localStorage.clear();
    
    // Clear all session storage data
    sessionStorage.clear();
    
    // Update auth state
    this.currentUserSubject.next(null);
  }

  forgetPassword(username: string): Observable<any> {
    return this.http.post(`${this.API_URL}/forgetpassword`, { username });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  getCurrentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  isCustomer(): boolean {
    return this.hasRole('Customer');
  }

  isRestaurantOwner(): boolean {
    return this.hasRole('RestaurantOwner');
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        this.currentUserSubject.next(JSON.parse(user));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        this.logout(localStorage.getItem('refreshToken') || '').subscribe();
      }
    }
  }
}
