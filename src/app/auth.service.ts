import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface AuthResponse {
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:6060';
  private loggedIn = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/user/auth/signin`, { email, password }).pipe(
      map(response => {
        if (response.status === 200) {
          this.loggedIn = true;
        }
        return response;
      })
    );
  }

  signup(name: string, email: string, role: String, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/user/auth/signup`, { name, email, role, password });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
