import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
        catchError(this.handleError)
      )
  }

  getSession(sessionToken: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/session`, { params: { sessionToken } })
     .pipe(
            catchError(this.handleError)
          );
  }

private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }

}
