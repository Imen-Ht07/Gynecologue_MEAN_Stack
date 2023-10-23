import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Secretaire } from '../model/secretaire';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecretaireService {

  constructor(private http: HttpClient) { }
  API_URI = 'http://localhost:4000/secretaire';

  getSecretaires(): Observable<Secretaire[]> {
    return this.http.get<Secretaire[]>(`${this.API_URI}/findAll`);
  }

  saveS(sec: Secretaire): Observable<Secretaire> {
    return this.http.post<Secretaire>(`${this.API_URI}/saveS`, sec);
  }

  deleteS(id: string) {
    return this.http.delete(`${this.API_URI}/delete/${id}`);
  }

  updateS(id: string, data: any): Observable<any> {
    return this.http.put<Secretaire>(`${this.API_URI}/update/${id}`, data);
  }

  get(id: string): Observable<any> {
    return this.http.get(`${this.API_URI}/getS/${id}`);
  }

  logoutUser() {
    localStorage.clear();
    window.location.reload();
  }
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    // Include the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.API_URI}/profile`, { headers }).pipe(
      catchError(error => {
        let errorMessage = 'No one loged yet';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(errorMessage);
      })
    );
  }
}
