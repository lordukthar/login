import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.interface';
import { User, UserService } from '../user.service'
import { PresentService } from '../present.service'
import { map } from 'rxjs/operators';

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

     constructor(private userService: UserService, private presentService: PresentService) {}

        ngOnInit() {
            this.userService.username$.subscribe((name:string) => {
               // this.username = name;

            });

             this.username = this.userService.getUser();
              this.fetchItems();
        }


   fetchItems(): void {
     const username = sessionStorage.getItem('username'); // Get the username from session storage

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


toggleBought(index: number) {
    if (this.objectList[index]) {
      this.objectList[index].bought = !this.objectList[index].bought;
    }
  }

    onItemDeleted(index: number) {
      this.objectList.splice(index, 1); // Remove the item from the list
    }

    onItemEdited(event: { index: number; item: any }) {
      const updatedName = prompt('Edit name:', event.item.name);
      if (updatedName !== null) {
        this.objectList[event.index].name = updatedName;
      }
    }
}
