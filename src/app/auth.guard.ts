import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {LoginService} from './login.service'
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private loginService: LoginService,
    private sessionService: SessionService, ) {}

  canActivate(): Promise<boolean> { {
/*
    console.log("FOO JALLA")
   const isAuthenticated = this.isLoggedIn(); // Replace this with your actual authentication check logic

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;*/

     const sessionToken = localStorage.getItem('sessionToken');
        if (!sessionToken) {
          this.router.navigate(['/login']);
          return Promise.resolve(false);
        }

        return this.sessionService.getSession(sessionToken).toPromise()
          .then(response => {
            return true;
          })
          .catch(error => {
            this.router.navigate(['/login']);
            return false;
          });
      }
    }



  private isLoggedIn(): boolean {
     return this.loginService.isAuthenticated();
  }
}


