import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authenticated = false;

  constructor() { }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  setAuthenticated(isAuthenticated:boolean): void {
    this.authenticated = isAuthenticated
  }

}
