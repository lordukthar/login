import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user.service'
import { SessionService } from '../session.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
            users: User[] = [];

            constructor(private userService: UserService, private sessionService: SessionService, private router: Router) { }


            ngOnInit() {
              this.getUsers();

              const sessionToken = localStorage.getItem('sessionToken');
                  if (sessionToken) {
                    this.sessionService.getSession(sessionToken).subscribe(
                      response => {
                        console.log('Session is valid', response);
                      },
                      error => {
                        console.error('Session is invalid or expired', error);
                        this.router.navigate(['/login']);
                      }
                    );
                  } else {
                    this.router.navigate(['/login']);
                  }

            }


           getUsers(): void {

              this.userService.getUsers().subscribe(users => this.users = users);

          }


}
