import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


interface User {
  username: string;
  password: string; // Storing plain text passwords is not secure; ensure you understand the risks.
  sessionToken?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private apiUrl = 'http://localhost:5000';


   users: User[] = [
    { username: "Jenny", password: "fotboll", },
    { username: "Otto", password: "otto1234" },
    { username: "Jonas", password: "Pkurlips1" },
    { username: "Sonia", password: "Shiraz1349" },
  ];


  findLoggedInUser = (username: string, password: string): User | null => {

   let  us : User | null =  this.users.find((user:User) => user.username === username && user.password === password) || null;

   if (us) {
        let modUs:User = {
               ...us,
               sessionToken: Date.now()}
               return modUs;
       }
    return us;
  };

  constructor(private http: HttpClient) { }

login(username: string, password: string): Observable<any> {
    return of(this.findLoggedInUser(username, password));
  }

  getSession(sessionToken: string): Observable<any> {


   return of(localStorage.getItem("sessionToken"));

  }

private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }

}
