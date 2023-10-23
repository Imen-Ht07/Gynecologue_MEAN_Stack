import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Patiente } from '../model/patiente';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser!: User;
  name!: string;
  currentPatiente!: Patiente;

  constructor(private http: HttpClient, private router: Router) { }

  API_URI = 'http://localhost:4000/auth';

  logoutUser() {
    localStorage.clear();
    window.location.reload();
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.API_URI}/signin`, user).pipe(
      map(response => {
        const data = response as any;
        const token = data.token;
        const role = data.role;
        const user = data.user; // Assuming the server returns the user object
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('user', JSON.stringify(user)); // Store the user object as a string
        return response;
      }),
      catchError(error => {
        const errorMessage = error.message || 'Something went wrong. Please try again later.';
        return throwError(errorMessage);
      })
    );
  }

  logout() {
    localStorage.removeItem('user'); // Update to remove 'User' key
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    const user = localStorage.getItem('user'); // Update to retrieve 'user' key
    return user ? JSON.parse(user) : null;
  }

  requestReset(body: any): Observable<any> {
    return this.http.post(`${this.API_URI}/ResetPassword`, body);
  }

  ValidPasswordToken(resettoken: any, patienteId: any): Observable<any> {
    return this.http.get(`${this.API_URI}/ValidPasswordToken${patienteId}/${resettoken}`);
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    // Include the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URI}/profile`, { headers }).pipe(
      catchError(error => {
        let errorMessage = 'An error occurred. Please try again later.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(errorMessage);
      })
    );
  }

  isDocteur(): boolean {
    const role = localStorage.getItem('role'); // Retrieve the role from localStorage
    return role === 'docteur'; // Check if the role is 'docteur'
  }
  isDocteurOrSecretaire(): boolean {
    const role = localStorage.getItem('role'); // Retrieve the role from localStorage
    return role === 'docteur' || role === 'secretaire';
  }
}
