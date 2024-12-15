import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.interface';
import { User, UserService } from '../user.service'
import { PresentService } from '../present.service'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-presents',
  templateUrl: './all-presents.component.html',
  styleUrl: './all-presents.component.scss'
})
export class AllPresentsComponent implements OnInit{


    username = ''
    isEditing = false;
    editedItem: Item| null = null;
    editingIndex: number | null = null;

        objectList: Item[] = [];

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

     console.log("FOO fetchItems()", username)

     this.presentService.get().pipe(
       map((items: Item[]) =>
         items.filter(item =>  item.wisher !== this.username) // Filter items where wisher matches username
       )
     ).subscribe(
       (filteredItems: Item[]) => {
         this.objectList = filteredItems; // Assign filtered items to objectList
       },
       (err: any) => {
         console.error('Error fetching items:', err);
       }
     );
   }


buy(index: number) {
    if (this.objectList[index]) {
      const body: Item = { ...this.objectList[index],
            bought:true,
            buyer:this.username
          };

       this.presentService.put(body)
              .subscribe((response:any) => {
                     console.log('Item with wisher deleteed:', response);
                   });

                  this.objectList[index] = body;
    }
  }

  regretBuy(index: number) {
      if (this.objectList[index]) {
       const body: Item = { ...this.objectList[index],
                   bought:false,
                   buyer:""
                 };

             console.log("FOO", JSON.stringify(body))

              this.presentService.put(body)
                     .subscribe((response:any) => {
                            console.log('Item with wisher deleteed:', response);
                          });

                         this.objectList[index] = body;



      }
    }

expandedCardId: number | null = null;

  toggleCard(cardId: number): void {

      if (cardId === undefined) {
          this.expandedCardId = 0;
          } else {
              this.expandedCardId = cardId;
              }

  }

}
