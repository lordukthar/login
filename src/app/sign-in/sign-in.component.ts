import { Component } from '@angular/core';
import { SignInService } from '../sign-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
    username: string = '';
    password: string = '';
    email: string = '';
       

constructor(private signInService: SignInService, private router: Router) { }


  onSubmit() : void {
    this.signInService.register(this.username, this.password, this.email).subscribe(
      response => {
        console.log('User registered successfully', response);
        this.router.navigate(['/login']);
        },
      error => {
         console.error('Registration failed', error);
          alert('Registration failed: ' + error.message);
      });
  }

}
