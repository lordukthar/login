import { Component, OnInit } from '@angular/core';


import { MyItem } from '../models/item.interface';
import { User, UserService } from '../user.service'
import { PresentService } from '../present.service'

@Component({
  selector: 'app-my-presents',
  templateUrl: './my-presents.component.html',
  styleUrl: './my-presents.component.scss'
})
export class MyPresentsComponent implements OnInit {
    username = ''
    isAddFormVisible = false; // Initially hidden
    isEditing = false;
    newItem: MyItem = { href: '', name: '', price: 0, description: ''};
    editedItem: MyItem| null = null;
    editingIndex: number | null = null;


    objectList : MyItem[] =  [
        {
            href: 'https://example.com/item1',
            name: 'Badrumsvåg',
            price: 19.99,
            description: 'This is the description for Item 1.'
        },
        {
            href: 'https://example.com/item2',
            name: 'Sneakers',
            price: 29.99,
            description: 'This is the description for Item 2.'
        },
        {
            href: 'https://example.com/item3',
            name: 'Morgonrock',
            price: 39.99,
            description: 'This is the description for Item 3.'
        }
    ];

    constructor(private userService: UserService, private presentService: PresentService) {}

    ngOnInit() {
        this.userService.username$.subscribe((name:string) => {
            this.username = name;
        });


        console.log("JKLK", this.userService.getUser());
    }

    deleteItem(index: number) {

         const itemName = this.objectList[index].name;
         if (itemName !== undefined) {
               this.presentService.delete(itemName, this.username)
                             .subscribe((response:any) => {
                             this.objectList.splice(index, 1);
                               console.log('Item with wisher deleteed:', response);
                             });

                      // Notify parent component to handle deletion
             }


    }

    toggleAddForm() {
        this.isAddFormVisible = !this.isAddFormVisible;
    }

    addItem() {
        this.presentService.add(this.newItem, this.username)
        .subscribe(response => {
            const myItem: MyItem = {
                href: response.href,
                name: response.name,
                price: response.price,
                description: response.description
              };

           this.objectList.push(myItem); // Add the saved item to the list
                      this.newItem = { href: '', name: '', price: 0, description: '' };
                      this.isAddFormVisible = false;

          console.log('Item with wisher added:', response);
        });
      }

    editItem(index: number) {
        this.isEditing = true;
        this.editingIndex = index;
        this.editedItem = { ...this.objectList[index] }; // Make a copy of the item to edit
    }

    saveChanges() {
        if (this.editingIndex !== null && this.editedItem) {

            const updatedItem: MyItem = {
                href: this.editedItem.href || '',
                name: this.editedItem.name || '',
                price: this.editedItem.price || 0,
                description: this.editedItem.description || ''
            };

            this.objectList[this.editingIndex] = updatedItem;
            this.isEditing = false;
            this.editedItem = null;
            this.editingIndex = null;
        }
    }
    cancelEdit() {
        this.isEditing = false; // Hide the modal without saving changes
        this.editingIndex = null;
    }


}


