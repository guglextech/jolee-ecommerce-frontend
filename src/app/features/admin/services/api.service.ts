import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(
      `${environment.API_URL}/${endpoint}`,
      params ? { params } : undefined
    );
  }

  post<T>(endpoint: string, body: any, baseUrl?: string): Observable<T> {
    return this.http.post<T>(
      `${baseUrl ? baseUrl : environment.API_URL}/${endpoint}`,
      body
    );
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${environment.API_URL}/${endpoint}`, body);
  }

  delete<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.delete<T>(
      `${environment.API_URL}/${endpoint}`,
      params ? { params } : undefined
    );
  }
}
