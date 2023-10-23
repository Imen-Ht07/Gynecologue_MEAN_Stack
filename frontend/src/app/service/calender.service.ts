import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calender } from '../model/calender';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private baseUrl = 'http://localhost:4000/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Calender[]> {
    return this.http.get<Calender[]>(this.baseUrl);
  }

  createEvent(eventData: Calender): Observable<Calender> {
    return this.http.post<Calender>(this.baseUrl, eventData);
  }

  updateEvent(id: string, eventData: Calender): Observable<Calender> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Calender>(url, eventData);
  }

  deleteEvent(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
