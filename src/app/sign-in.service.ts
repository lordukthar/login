import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  register(username:string, password:string, email:string):Observable<any> {
      return this.http.post<any>('${this.apiUrl}/register', {username, password, email})
        .pipe(
            catchError(this.handleError)
        );
  }


  private handleError(error: HttpErrorResponse) {
      console.error('An error occurred:', error.message);
      return throwError('Something went wrong; please try again later.');
    }
}
