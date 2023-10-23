import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = 'http://localhost:4000/appointment';

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`).pipe(
      catchError(this.handleError)
    );
  }

  addAppointment(appointment: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.apiUrl}/new`, appointment, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  getById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getById/${id}`)
  }
  getA(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getA`)
  }
  deleteAppointment(appointment: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = {
      headers: headers,
      body: appointment // Pass the appointment data as the request body
    };
  
    return this.http.delete(`${this.apiUrl}/destroy`, options).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || error);
  }

}
