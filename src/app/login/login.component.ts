import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { SessionService } from '../session.service';
import { User, UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';
    errorMessage: string = ''; // To store error messages

    constructor(private router: Router,
      private loginService: LoginService,
      private userService: UserService,
      private sessionService: SessionService) {}


      ngOnInit() {

         // Check if the auth cookie is already set
          if (this.userService.isCookieSet('authToken')) {
            this.loginService.setAuthenticated(true)
            this.router.navigate(['/my-presents']);
          }
        }


    login() {

       this.sessionService.login(this.username, this.password).subscribe(
            response => {
              console.log('Login successful', response);

              if (!response) {
                  this.errorMessage = 'Login misslyckades fel uid eller pwd';
              } else {
                     localStorage.setItem("sessionToken", response.sessionToken)

                                this.userService.setUserName(this.username);
                                 this.router.navigate(['/dashboard']);
                  }

              // Store the session token and user info as needed
            },
            error => {
              console.error('Login failed', error);
              alert('Login failed: ' + error.message);
            }
          );



      /* const user : User = {
             username: this.username,
             password: this.password,
             id:0,
             name:''
       }

      if (this.username === 'admin' && this.password === 'password') {

            this.userService.setCookie('authToken', 'your-auth-token', 5); // Set a cookie for 7 days

           this.loginService.setAuthenticated(true);
           this.router.navigate(['/dashboard']);
      } else {
           alert('Invalid credentials');
      }*/
    }
}
