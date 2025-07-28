import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { LoaderServiceService } from 'src/app/loader-service.service';

@Injectable({
  providedIn: 'root',
})
export class MalarService {
  private BASE_URL = 'https://dev.nexafuze.com/malar-app-api/v1';

  constructor(private http: HttpClient, private loader: LoaderServiceService) { }

  private getHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
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
  login(data: any): Observable<string> {
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, data).pipe(
      map(res => res),
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
  getAllUserProfile(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/auth/users`, this.getHeaders()).pipe(
      map((res: any) => res.response),
      catchError(this.handleError)
    );
  }
  createUserProfile(body: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/user`, body, this.getHeaders()).pipe(
      map((res: any) => res.response),
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
    return this.http.get<any>(`${this.BASE_URL}/list/dryers`, this.getHeaders()).pipe(
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
    return this.http.get<any>(`${this.BASE_URL}/pre-streaming`, this.getHeaders()).pipe(
      map(res => res.response?.data),
      catchError(this.handleError)
    );
  }

  createPrestreaming(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/pre-streaming`, data, this.getHeaders()).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getPrestreamingById(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/pre-streaming/${id}`, this.getHeaders()).pipe(
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
  getCounts(): Observable<{ daily: number; pre: number }> {
    const dailyProcess$ = this.http.get<any>(`${this.BASE_URL}/daily-process`, this.getHeaders()).pipe(
      map(res => res.response?.total || 0),
      catchError(this.handleError)
    );

    const preStreaming$ = this.http.get<any>(`${this.BASE_URL}/pre-streaming`, this.getHeaders()).pipe(
      map(res => res.response?.total || 0),
      catchError(this.handleError)
    );
    const streaming$ = this.http.get<any>(`${this.BASE_URL}/streaming`, this.getHeaders()).pipe(
      map((res: any) => res.response?.total || 0),
      catchError(this.handleError)
    );
    const pendingDailyProcess$ = this.http.get<any>(`${this.BASE_URL}/daily-process`, this.getHeaders()).pipe(
      map(res => {
        const data = res.response?.data || [];
        const pending = data.filter((item: any) => !item.approved_by);
        return pending.length;
      }),
      catchError(this.handleError)
    );
    const userListCount$ = this.http.get(`${this.BASE_URL}/auth/users`, this.getHeaders()).pipe(
      map((res: any) => res.response.total || 0),
      catchError(this.handleError)
    );

    return forkJoin({
      daily: dailyProcess$,
      pre: preStreaming$,
      stream: streaming$,
      pendingDailyProcess: pendingDailyProcess$,
      userCount: userListCount$
    });
  }
  getUserCounts(): Observable<{ daily: number; pre: number }> {
    const dailyProcess$ = this.http.get<any>(`${this.BASE_URL}/daily-process`, this.getHeaders()).pipe(
      map(res => res.response?.total || 0),
      catchError(this.handleError)
    );

    const preStreaming$ = this.http.get<any>(`${this.BASE_URL}/pre-streaming`, this.getHeaders()).pipe(
      map(res => res.response?.total || 0),
      catchError(this.handleError)
    );
    const streaming$ = this.http.get<any>(`${this.BASE_URL}/streaming`, this.getHeaders()).pipe(
      map((res: any) => res.response?.total || 0),
      catchError(this.handleError)
    );

    return forkJoin({
      daily: dailyProcess$,
      pre: preStreaming$,
      stream: streaming$,
    });
  }

  private withLoader<T>(obs: Observable<T>, message: string = 'Loading...'): Observable<T> {
    this.loader.show(message);
    return obs.pipe(
      map((res: T) => {
        this.loader.hide();
        return res;
      }),
      catchError(err => {
        this.loader.hide();
        return this.handleError(err);
      })
    );
  }

}

