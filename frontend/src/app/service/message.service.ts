import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:4000/message';
  constructor(private http: HttpClient) { }

  getMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`).pipe(
      catchError(this.handleError)
    );
  }

// Get message
getMessage(id: any): Observable<any> {
  const headers = new HttpHeaders({'Content-Type': 'application/json'});
  const url = `${this.apiUrl}/read/${id}`;
  return this.http.get(url, { headers }).pipe(
    map((res: any) => {
      return res || {};
    }),
    catchError(this.handleError)
  );
}

getM(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/getM`)
}
  addMessage(message: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.apiUrl}/new`, message, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  updateMessage(id: string | null, message: any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    let url = `${this.apiUrl}/update/${id}`;
    return this.http
      .put(url, message, { headers})
      .pipe(catchError(this.handleError));
  }

   // Delete message
   deleteMessage(id: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete(url);
  }
    
    
  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || error);
  }
}
