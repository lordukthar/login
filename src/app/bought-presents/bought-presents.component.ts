import { Component, OnInit } from '@angular/core';


import { Item } from '../models/item.interface';
import { User, UserService } from '../user.service'
import { PresentService } from '../present.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-bought-presents',
  templateUrl: './bought-presents.component.html',
  styleUrl: './bought-presents.component.scss'
})
export class BoughtPresentsComponent  implements OnInit {
    username = ''
    isAddFormVisible = false; // Initially hidden
    isEditing = false;
    newItem: Item = { href: '', name: '', price: 0, description: '',
     bought: false,
                buyer: undefined,
                wisher: this.username};
    editedItem: Item| null = null;
    editingIndex: number | null = null;


    objectList : Item[] =  [];

    constructor(private userService: UserService, private presentService: PresentService, private router: Router) {}

    ngOnInit() {

       this.username = this.userService.getUser();


                              if (this.username === "" || this.username === undefined || this.username === null) {
                                  sessionStorage.removeItem('username');
                                  this.router.navigate(['/login']);
                              }
                       this.fetchItems();
    }


 fetchItems(): void {

     const username = sessionStorage.getItem('username'); // Get the username from session storage

          if (username === "" || username === undefined || username === null) {
                        sessionStorage.removeItem('username');
                        this.router.navigate(['/login']);

        }

        this.presentService.get().subscribe({
          next: (items:Item[]) => {
            this.objectList = items; // Assign fetched items to objectList
          },
          error: (err:any) => {
            console.error('Error fetching items:', err);
          }
        });
      }

   doNotNuy(index: number) {
       if (this.objectList[index]) {
         this.objectList[index].bought = false;
         this.objectList[index].buyer = undefined;
       }
     }



filteredList(): Item[] {
  return this.objectList.filter(item => item.buyer === this.username);
}


}



