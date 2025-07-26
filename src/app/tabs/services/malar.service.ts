import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MalarService {
  private BASE_URL = 'https://dev.nexafuze.com/malar-app-api/v1';

  constructor(private http: HttpClient) { }

  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzY0MGI3MTlhYzRhM2Q4ZjZjMDE0MCIsInR5cGUiOiJzdXBlcl9hZG1pbiIsIm5hbWUiOiJhZG1pbiIsImlhdCI6MTc1MzIzNDU1NywiZXhwIjoxNzU2MzQ0OTU3fQ.nJBv94HmUDRhMZLM0XVjDo2uixFCXRYwB9C-Skf89d4';
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    };
  }

  private handleError(error: any): Observable<never> {
    console.error('API error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }

  // ------------------------
  // ✅ AUTH
  // ------------------------
  login(credentials: { username: string; password: string }): Observable<string> {
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, credentials).pipe(
      map(res => res.response?.token),
      catchError(this.handleError)
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/logout`, {}, this.getHeaders()).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  // ------------------------
  // ✅ USER
  // ------------------------
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/user/profile`, this.getHeaders()).pipe(
      map((res: any) => res.response?.user || res.response),
      catchError(this.handleError)
    );
  }

  // ------------------------
  // ✅ MASTER DATA
  // ------------------------
  getItems(): Observable<any[]> {
    return this.http.get<any>(`${this.BASE_URL}/list/items`, this.getHeaders()).pipe(
      map(res => res.response?.data),
      catchError(this.handleError)
    );
  }

  getUnits(): Observable<any[]> {
    return this.http.get<any>(`${this.BASE_URL}/list/units`, this.getHeaders()).pipe(
      map(res => res.response?.data),
      catchError(this.handleError)
    );
  }

  getGodowns(): Observable<any[]> {
    return this.http.get<any>(`${this.BASE_URL}/list/godown`, this.getHeaders()).pipe(
      map(res => res.response?.data),
      catchError(this.handleError)
    );
  }

  getDryers(): Observable<any[]> {
    return this.http.get<any>(`${this.BASE_URL}/list/dryer`, this.getHeaders()).pipe(
      map(res => res.response?.data),
      catchError(this.handleError)
    );
  }

  // ------------------------
  // ✅ DAILY PROCESS
  // ------------------------
  getDailyProcesses(): Observable<any[]> {
    return this.http.get<any>(`${this.BASE_URL}/daily-process`, this.getHeaders()).pipe(
      map(res => res.response?.data),
      catchError(this.handleError)
    );
  }

  createDailyProcess(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/daily-process`, data, this.getHeaders()).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getDailyProcessById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/daily-process/${id}`, this.getHeaders()).pipe(
      map((res: any) => res.response),
      catchError(this.handleError)
    );
  }

  approveDailyProcess(id: string): Observable<any> {
    return this.http.put(`${this.BASE_URL}/daily-process/${id}/approve`, {}, this.getHeaders()).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  rejectDailyProcess(id: string): Observable<any> {
    return this.http.put(`${this.BASE_URL}/daily-process/${id}/reject`, {}, this.getHeaders()).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  // ------------------------
  // ✅ PRESTREAMING
  // ------------------------
  getPrestreamings(): Observable<any[]> {
    return this.http.get<any>(`${this.BASE_URL}/prestreaming`, this.getHeaders()).pipe(
      map(res => res.response?.data),
      catchError(this.handleError)
    );
  }

  createPrestreaming(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/prestreaming`, data, this.getHeaders()).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getPrestreamingById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/prestreaming/${id}`, this.getHeaders()).pipe(
      map((res: any) => res.response),
      catchError(this.handleError)
    );
  }

  // ------------------------
  // ✅ STREAMING
  // ------------------------
  getStreamings(): Observable<any[]> {
    return this.http.get<any>(`${this.BASE_URL}/streaming`, this.getHeaders()).pipe(
      map((res: any) => res.response?.data),
      catchError(this.handleError)
    );
  }

  createStreaming(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/streaming`, data, this.getHeaders()).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    );
  }

  getStreamingById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/streaming/${id}`, this.getHeaders()).pipe(
      map((res: any) => res.response),
      catchError(this.handleError)
    );
  }
}
