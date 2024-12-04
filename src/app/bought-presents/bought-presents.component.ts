import { Component, OnInit } from '@angular/core';


import { Item } from '../models/item.interface';
import { User, UserService } from '../user.service'
import { PresentService } from '../present.service'

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

    constructor(private userService: UserService, private presentService: PresentService) {}

    ngOnInit() {
        this.userService.username$.subscribe((name:string) => {
           // this.username = name;
        });

             this.username = this.userService.getUser();
                       this.fetchItems();
    }


 fetchItems(): void {
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



