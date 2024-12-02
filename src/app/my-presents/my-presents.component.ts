import { Component, OnInit } from '@angular/core';


import { Item, MyItem } from '../models/item.interface';
import { User, UserService } from '../user.service'

@Component({
  selector: 'app-my-presents',
  templateUrl: './my-presents.component.html',
  styleUrl: './my-presents.component.scss'
})
export class MyPresentsComponent implements OnInit {
    username = ''
    isAddFormVisible = false; // Initially hidden
    isEditing = false;
    newItem: Item = { href: '', name: '', price: 0, description: '', bought: false, buyer: undefined};
    editedItem: Item| null = null;
    editingIndex: number | null = null;


    objectList : Item[] =  [
        {
            href: 'https://example.com/item1',
            name: 'Item 1',
            price: 19.99,
            description: 'This is the description for Item 1.',
            bought: true,
            buyer:'Jenny'
        },
        {
            href: 'https://example.com/item2',
            name: 'Item 2',
            price: 29.99,
            description: 'This is the description for Item 2.',
            bought: true,
            buyer:'Jenny'
        },
        {
            href: 'https://example.com/item3',
            name: 'Item 3',
            price: 39.99,
            description: 'This is the description for Item 3.',
            bought: true,
            buyer:'Jenny'
        }
    ];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.username$.subscribe((name:string) => {
            this.username = name;
        });
    }

    deleteItem(index: number) {
        this.objectList.splice(index, 1);  // Notify parent component to handle deletion
    }

    toggleAddForm() {
        this.isAddFormVisible = !this.isAddFormVisible;
    }

    addItem() {
        this.objectList.push({ ...this.newItem });
        this.newItem = { href: '', name: '', price: 0, description: '',bought: false,buyer: undefined };
        this.isAddFormVisible = false; // Hide the form after adding an item
    }

    editItem(index: number) {
        this.isEditing = true;
        this.editingIndex = index;
        this.editedItem = { ...this.objectList[index] }; // Make a copy of the item to edit
    }

    saveChanges() {
        if (this.editingIndex !== null && this.editedItem) {

            const updatedItem: Item = {
                buyer:'',
                href: this.editedItem.href || '',
                name: this.editedItem.name || '',
                price: this.editedItem.price || 0,
                description: this.editedItem.description || '',
                bought: this.editedItem.bought ?? false, // Ensure `bought` is not undefined
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


