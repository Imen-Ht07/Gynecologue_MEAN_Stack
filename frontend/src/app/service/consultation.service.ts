import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  baseUri: string = 'http://localhost:4000/consultation';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers.append('Content-Type', 'multipart/form-data');
  }

  // Create consultation
  createConsultation(patientId: string, data: FormData): Observable<any> {
    const url = `${this.baseUri}/${patientId}/create`;
    return this.http.post(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Get all consultations for a specific user
  getConsultations(patientId: string): Observable<any> {
    const url = `${this.baseUri}/patient/${patientId}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Get single consultation
  getConsultation(id: any): Observable<any> {
    const url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update consultation
  updateConsultation(id: string | null, data: FormData): Observable<any> {
    const url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Delete consultation
  deleteConsultation(id: string): Observable<any> {
    const url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.errorMgmt)
    );
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
