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

  private withLoader<T>(obs: Observable<T>, message: string = 'Loading...'): Observable<T> {
    this.loader.show(message);
    return obs.pipe(
      map((res: T) => {
        setTimeout(() => {
          this.loader.hide();
        }, 1000)
        return res;
      }),
      catchError(err => {
        this.loader.hide();
        return this.handleError(err);
      })
    );
  }

  // ✅ AUTH
  login(data: any): Observable<string> {
    const obs = this.http.post<any>(`${this.BASE_URL}/auth/login`, data);
    return this.withLoader(obs, 'Logging in...');
  }

  logout(): Observable<any> {
    const obs = this.http.post(`${this.BASE_URL}/auth/logout`, {}, this.getHeaders());
    return this.withLoader(obs, 'Logging out...');
  }

  // ✅ USER
  getUserProfile(): Observable<any> {
    const obs = this.http.get(`${this.BASE_URL}/user/profile`, this.getHeaders())
      .pipe(map((res: any) => res.response?.user || res.response));
    return this.withLoader(obs, 'Fetching user profile...');
  }

  getAllUserProfile(): Observable<any> {
    const obs = this.http.get(`${this.BASE_URL}/auth/users`, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Fetching all users...');
  }
  getUserProfileId(id: string): Observable<any> {
    const obs = this.http.get(`${this.BASE_URL}/auth/user/${id}`, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'User detail details...');
  }

  createUserProfile(body: any): Observable<any> {
    const obs = this.http.post(`${this.BASE_URL}/auth/user`, body, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Creating user...');
  }
  deleteUserProfile(id: any): Observable<any> {
    const obs = this.http.delete(`${this.BASE_URL}/auth/user/${id}`, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Deleting user profile details...');
  }
  putUserProfileId(id: any, data: any): Observable<any> {
    const obs = this.http.put(`${this.BASE_URL}/auth/user/${id}`, data, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Updateing user details...');
  }

  // ✅ MASTER DATA
  getItems(): Observable<any[]> {
    const obs = this.http.get<any>(`${this.BASE_URL}/list/items`, this.getHeaders())
      .pipe(map(res => res.response?.data));
    return this.withLoader(obs, 'Loading items...');
  }

  getUnits(): Observable<any[]> {
    const obs = this.http.get<any>(`${this.BASE_URL}/list/units`, this.getHeaders())
      .pipe(map(res => res.response?.data));
    return this.withLoader(obs, 'Loading units...');
  }

  getGodowns(): Observable<any[]> {
    const obs = this.http.get<any>(`${this.BASE_URL}/list/godown`, this.getHeaders())
      .pipe(map(res => res.response?.data));
    return this.withLoader(obs, 'Loading godowns...');
  }

  getDryers(): Observable<any[]> {
    const obs = this.http.get<any>(`${this.BASE_URL}/list/dryers`, this.getHeaders())
      .pipe(map(res => res.response?.data));
    return this.withLoader(obs, 'Loading dryers...');
  }

  // ✅ DAILY PROCESS
  getDailyProcesses(): Observable<any[]> {
    const obs = this.http.get<any>(`${this.BASE_URL}/daily-process`, this.getHeaders())
      .pipe(map(res => res.response?.data));
    return this.withLoader(obs, 'Fetching daily processes...');
  }
  loginTokenCheck(): Observable<any[]> {
    const obs = this.http.get<any>(`${this.BASE_URL}/daily-process`, this.getHeaders())
      .pipe(map(res => res.response?.data));
    return this.withLoader(obs, 'Checking user processes...');
  }

  createDailyProcess(data: any): Observable<any> {
    const obs = this.http.post(`${this.BASE_URL}/daily-process`, data, this.getHeaders())
      .pipe(map(res => res));
    return this.withLoader(obs, 'Creating daily process...');
  }

  getDailyProcessById(id: string): Observable<any> {
    const obs = this.http.get(`${this.BASE_URL}/daily-process/${id}`, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Fetching process details...');
  }
  putDailyProcessById(id: any, data: any): Observable<any> {
    const obs = this.http.put(`${this.BASE_URL}/daily-process/${id}`, data, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Fetching process details...');
  }
  deleteDailyProcessById(id: any): Observable<any> {
    const obs = this.http.delete(`${this.BASE_URL}/daily-process/${id}`, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Deleting process details...');
  }

  approveDailyProcess(id: string): Observable<any> {
    const obs = this.http.post(`${this.BASE_URL}/daily-process/approve/${id}`, {}, this.getHeaders())
      .pipe(map(res => res));
    return this.withLoader(obs, 'Approving process...');
  }

  rejectDailyProcess(id: string): Observable<any> {
    const obs = this.http.put(`${this.BASE_URL}/daily-process/${id}/reject`, {}, this.getHeaders())
      .pipe(map(res => res));
    return this.withLoader(obs, 'Rejecting process...');
  }

  // ✅ PRESTREAMING
  getPrestreamings(): Observable<any[]> {
    const obs = this.http.get<any>(`${this.BASE_URL}/pre-streaming`, this.getHeaders())
      .pipe(map(res => res.response?.data));
    return this.withLoader(obs, 'Fetching prestreamings...');
  }

  createPrestreaming(data: any): Observable<any> {
    const obs = this.http.post(`${this.BASE_URL}/pre-streaming`, data, this.getHeaders())
      .pipe(map(res => res));
    return this.withLoader(obs, 'Creating prestreaming...');
  }
  putPrestreaming(id: any, data: any): Observable<any> {
    const obs = this.http.put(`${this.BASE_URL}/pre-streaming/${id}`, data, this.getHeaders())
      .pipe(map(res => res));
    return this.withLoader(obs, 'Creating prestreaming...');
  }
  deletePrestreaming(id: any): Observable<any> {
    const obs = this.http.delete(`${this.BASE_URL}/pre-streaming/${id}`, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Deleting prestreaming details...');
  }


  getPrestreamingById(id: string): Observable<any> {
    const obs = this.http.get(`${this.BASE_URL}/pre-streaming/${id}`, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Getting prestreaming details...');
  }

  // ✅ STREAMING
  getStreamings(): Observable<any[]> {
    const obs = this.http.get<any>(`${this.BASE_URL}/streaming`, this.getHeaders())
      .pipe(map((res: any) => res.response?.data));
    return this.withLoader(obs, 'Fetching streamings...');
  }

  createStreaming(data: any): Observable<any> {
    const obs = this.http.post(`${this.BASE_URL}/streaming`, data, this.getHeaders())
      .pipe(map((res: any) => res));
    return this.withLoader(obs, 'Creating streaming...');
  }

  getStreamingById(id: string): Observable<any> {
    const obs = this.http.get(`${this.BASE_URL}/streaming/${id}`, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Getting streaming details...');
  }
  deletestreaming(id: any): Observable<any> {
    const obs = this.http.delete(`${this.BASE_URL}/streaming/${id}`, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Deleting streaming details...');
  }
  putStreaming(id: any, data: any): Observable<any> {
    const obs = this.http.put(`${this.BASE_URL}/streaming/${id}`, data, this.getHeaders())
      .pipe(map(res => res));
    return this.withLoader(obs, 'Creating prestreaming...');
  }
  getCounts(): Observable<any> {
    const dailyProcess$ = this.http.get<any>(`${this.BASE_URL}/daily-process`, this.getHeaders())
      .pipe(map(res => res.response?.total || 0), catchError(this.handleError));

    const preStreaming$ = this.http.get<any>(`${this.BASE_URL}/pre-streaming`, this.getHeaders())
      .pipe(map(res => res.response?.total || 0), catchError(this.handleError));

    const streaming$ = this.http.get<any>(`${this.BASE_URL}/streaming`, this.getHeaders())
      .pipe(map((res: any) => res.response?.total || 0), catchError(this.handleError));

    const pendingDailyProcess$ = this.http.get<any>(`${this.BASE_URL}/daily-process`, this.getHeaders())
      .pipe(
        map(res => {
          const data = res.response?.data || [];
          return data.filter((item: any) => !item.approved_by).length;
        }),
        catchError(this.handleError)
      );

    const userListCount$ = this.http.get(`${this.BASE_URL}/auth/users`, this.getHeaders())
      .pipe(map((res: any) => res.response.total || 0), catchError(this.handleError));

    return this.withLoader(
      forkJoin({
        daily: dailyProcess$,
        pre: preStreaming$,
        stream: streaming$,
        pendingDailyProcess: pendingDailyProcess$,
        userCount: userListCount$
      }),
      'Loading dashboard counts...'
    );
  }

  getUserCounts(): Observable<any> {
    const dailyProcess$ = this.http.get<any>(`${this.BASE_URL}/daily-process`, this.getHeaders())
      .pipe(map(res => res.response?.total || 0), catchError(this.handleError));

    const preStreaming$ = this.http.get<any>(`${this.BASE_URL}/pre-streaming`, this.getHeaders())
      .pipe(map(res => res.response?.total || 0), catchError(this.handleError));

    const streaming$ = this.http.get<any>(`${this.BASE_URL}/streaming`, this.getHeaders())
      .pipe(map((res: any) => res.response?.total || 0), catchError(this.handleError));

    return this.withLoader(
      forkJoin({
        daily: dailyProcess$,
        pre: preStreaming$,
        stream: streaming$
      }),
      'Loading dashboard counts...'
    );
  }
  createReport(data: any): Observable<any> {
    const obs = this.http.post(`${this.BASE_URL}/sample-report`, data, this.getHeaders());
    return this.withLoader(obs, 'Creating report...');
  }

  getReport(): Observable<any[]> {
    const obs = this.http.get<any>(`${this.BASE_URL}/sample-report/`, this.getHeaders())
      .pipe(map((res: any) => res.response?.data));
    return this.withLoader(obs, 'Fetching sample reports...');
  }

  getReportById(id: string): Observable<any> {
    const obs = this.http.get(`${this.BASE_URL}/sample-report/${id}`, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Fetching report details...');
  }

  updateReport(id: string, data: any): Observable<any> {
    const obs = this.http.put(`${this.BASE_URL}/sample-report/${id}`, data, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Updating report...');
  }

  deleteReport(id: string): Observable<any> {
    const obs = this.http.delete(`${this.BASE_URL}/sample-report/${id}`, this.getHeaders())
      .pipe(map((res: any) => res.response));
    return this.withLoader(obs, 'Deleting report...');
  }
}
