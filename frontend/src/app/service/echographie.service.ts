
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Echographie } from '../model/echographie';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EchographieService {

  private apiUrl = 'http://localhost:4000/eco';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getAllEco(patientId: string): Observable<Echographie[]> {
    const url = `${this.apiUrl}/eco/${patientId}`;
    return this.http.get<Echographie[]>(url);
  }

  createEco(eco: Echographie, patientId: string, dicom: File): Observable<Echographie> {
    const formData = new FormData();
    formData.append('title', eco.title);
    formData.append('description', eco.description);
    formData.append('content', eco.content);
    formData.append('dicom', dicom, dicom.name);
    return this.http.post<Echographie>(`${this.apiUrl}/${patientId}/new`, formData);
  }

  getEco(patientId: string): Observable<Echographie> {
    const url = `${this.apiUrl}/eco/${patientId}`;
    return this.http.get<Echographie>(url);
  }

  updateEco(id: string, eco: Echographie, dicom: File): Observable<Echographie> {
    const formData = new FormData();
    formData.append('title', eco.title);
    formData.append('description', eco.description);
    formData.append('content', eco.content);
    formData.append('dicom', dicom, dicom.name);
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Echographie>(url, formData);
  }

  deleteEco(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
