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


    objectList : Item[] =  [
        {
            href: 'https://example.com/item1',
            name: 'Badrumsvåg',
            price: 19.99,
            description: 'This is the description for Item 1.',
            bought: false,
            buyer: undefined,
            wisher: this.username
        },
        {
            href: 'https://example.com/item2',
            name: 'Sneakers',
            price: 29.99,
            description: 'This is the description for Item 2.',
           bought: false,
            buyer: undefined,
            wisher: this.username
        },
        {
            href: 'https://example.com/item3',
            name: 'Morgonrock',
            price: 39.99,
            description: 'This is the description for Item 3.',
           bought: false,
            buyer: undefined,
            wisher: this.username
        }
    ];

    constructor(private userService: UserService, private presentService: PresentService) {}

    ngOnInit() {
        this.userService.username$.subscribe((name:string) => {
           // this.username = name;
        });

         this.username = this.userService.getUser();
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



