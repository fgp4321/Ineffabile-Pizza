// auth.service.ts
/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.http.post('/api/v2/usuarios/login', { username, password }).subscribe((response: any) => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        if (response.user.rol === 'ADMIN') {
          this.router.navigate(['/Home']);
        } else {
          this.router.navigate(['localhost:9100/']);
        }
      }
    });
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.rol === 'ADMIN';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}*/
