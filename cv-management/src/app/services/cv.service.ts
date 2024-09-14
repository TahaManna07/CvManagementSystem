// cv.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private baseUrl = 'http://localhost:5000'; // URL de votre API

  constructor(private http: HttpClient) {}

  getCVs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cvs`);
  }

  getCvById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/cv/${id}`);
  }

  updateCv(id: number, cvData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/cv/${id}`, cvData);
  }

  deleteCV(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cv/${id}`);
  }
  downloadPDF(cvId: number) {
    const url = `http://localhost:5000/cv/${cvId}/pdf`;
    window.open(url, '_blank');  // Ouvre le fichier PDF dans un nouvel onglet
  }



}
