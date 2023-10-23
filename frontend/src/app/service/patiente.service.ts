import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Patiente } from '../model/patiente';

@Injectable({
  providedIn: 'root'
})
export class PatienteService {

  constructor(private http: HttpClient) { }
  API_URI = 'http://localhost:4000/patiente';

  logoutUser() {
    localStorage.clear();
    window.location.reload();
  }

  getP(searchTerm: string = ''): Observable<Patiente[]> {
    const query = searchTerm ? `?nomP=${searchTerm}` : '';
    return this.http.get<Patiente[]>(`${this.API_URI}/findAll${query}`);
  }

  saveP(pat: Patiente): Observable<Patiente> {
    return this.http.post<Patiente>(`${this.API_URI}/saveP`, pat);
  }

  getNbP(): Observable<any> {
    return this.http.get<any>(`${this.API_URI}/getP`);
  }

  deleteP(id: string) {
    return this.http.delete(`${this.API_URI}/delete/${id}`);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.API_URI}/update/${id}`, data);
  }

  updatePassword(id: string, oldPassword: any, newPassword: any): Observable<any> {
    return this.http.put(`${this.API_URI}/Update-password/${id}`, { oldPassword, newPassword });
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/getById/${id}`);
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
  isPatient(): boolean {
    const role = localStorage.getItem('role'); // Retrieve the role from localStorage
    return role === 'patiente'; // Check if the role is 'patiente'
  }
}
