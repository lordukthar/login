import { Component } from '@angular/core';
import { UserService } from '../user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

   constructor(private router: Router,
        private userService: UserService) {}


        logout(): void {
          console.log("FOOF")
          this.userService.deleteCookie('authToken')
           this.router.navigate(['/login']);
        }

}
