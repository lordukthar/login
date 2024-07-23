import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type User = {
  id: number,
  name: string,
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) { }

 getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }


isCookieSet(name: string): boolean {
    return this.getCookie(name) !== null;
  }


 setCookie(name: string, value: string, minutes: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }

 getCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }


  deleteCookie(name: string): void {
      document.cookie = `${name}=; Max-Age=-99999999;`;
    }

}
