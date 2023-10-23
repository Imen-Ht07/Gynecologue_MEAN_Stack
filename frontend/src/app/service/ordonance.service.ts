import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {Ordonnance} from '../model/ordonance';
@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {
  baseUri: string = 'http://localhost:4000/ord';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  // Create
  createOrdonance(patientId: string, data: any): Observable<any> {
    const url = `${this.baseUri}/${patientId}/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }
  
  // Get all ordonances for a specific user
getOrdonnances(patientId: string): Observable<any> {
  const url = `${this.baseUri}/patient/${patientId}`;
  return this.http.get(url, { headers: this.headers }).pipe(
    map((res: any) => {
      return res || {};
    }),
    catchError(this.errorMgmt)
  );
}
// Get ordonance
getOrd(id: any): Observable<any> {
  const url = `${this.baseUri}/read/${id}`;
  return this.http.get(url, { headers: this.headers }).pipe(
    map((res: any) => {
      return res || {};
    }),
    catchError(this.errorMgmt)
  );
}

  // Update ordonance
  updateOrdonance(id: string | null, data: any): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  // Delete ordonance
  deleteOrdonance(id: string): Observable<any> {
    const url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url);
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
    return throwError(() => {
      return errorMessage;
    });
  }

}