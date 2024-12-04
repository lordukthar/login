import { Component, OnInit } from '@angular/core';


import { Item } from '../models/item.interface';
import { User, UserService } from '../user.service'
import { PresentService } from '../present.service'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-my-presents',
  templateUrl: './my-presents.component.html',
  styleUrl: './my-presents.component.scss'
})
export class MyPresentsComponent implements OnInit {
    username = ''
    isAddFormVisible = false; // Initially hidden
    isEditing = false;
    newItem: Item = { href: '', name: '', price: 0, description: '',
     bought: false,
                buyer: undefined,
                wisher: this.username};
    editedItem: Item| null = null;
    editingIndex: number | null = null;


    objectList: Item[] = [];

    constructor(private userService: UserService, private presentService: PresentService) {}

    ngOnInit() {

        this.fetchItems();
        this.userService.username$.subscribe((name:string) => {
           // this.username = name;
        });

         this.username = this.userService.getUser();
         console.log("FOO", this.username)
    }

fetchItems(): void {
  const username = sessionStorage.getItem('username'); // Get the username from session storage

  this.presentService.get().pipe(
    map((items: Item[]) =>
      items.filter(item => item.wisher === username) // Filter items where wisher matches username
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

    deleteItem(index: number) {

        const id = this.objectList[index].id || 0;

       this.presentService.delete(id)
             .subscribe((response:any) => {
             this.objectList.splice(index, 1);
               console.log('Item with wisher deleteed:', response);
     });

                      // Notify parent component to handle deletio

    }

    toggleAddForm() {
        this.isAddFormVisible = !this.isAddFormVisible;
    }

    addItem() {

        const body: Item = {
          ...this.newItem,           // Spread all properties of item
          wisher: this.username,  // Explicitly set wisher to username
          bought:false              // Include buyer if it's defined
        };


        this.presentService.post(body)
        .subscribe((response:any) => {
            const myItem: Item = {
                href: response.href,
                name: response.name,
                price: response.price,
                description: response.description,
                bought: false,
                buyer: undefined,
                wisher: this.username
              };

           this.objectList.push(body); // Add the saved item to the list
                      this.newItem = { href: '', name: '', price: 0, description: '', bought: false,
                            buyer: undefined, wisher: this.username };
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

            const updatedItem: Item = {
                id: this.editedItem.id,
                href: this.editedItem.href || '',
                name: this.editedItem.name || '',
                price: this.editedItem.price || 0,
                description: this.editedItem.description || '',
                bought: false,
                buyer: undefined,
                wisher: this.username
            };

        this.presentService.put(updatedItem)
        .subscribe((response:any) => {
               console.log('Item with wisher deleteed:', response);
             });

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



filteredList(): Item[] {
  return this.objectList.filter(item => item.wisher === this.username);
}


}


