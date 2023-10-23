import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import{Sms} from '../model/sms'
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SmsService {
  baseUri: string = 'http://localhost:4000/twilio';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  Send(appointmentId: string,data:any) :Observable<any>{
    return this.http.post<Sms>(`${this.baseUri}/${appointmentId}/msgtwilio`, data)
  }
}
