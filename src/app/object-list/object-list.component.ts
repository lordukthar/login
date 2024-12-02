import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Item } from '../models/item.interface';
import { User, UserService } from '../user.service'

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent implements OnInit {
  @Input() items: Item[] = [];
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() itemEdited = new EventEmitter<{ index: number; item: Item }>();
  username: string = '';



   isEditing = false;
   newItem: Item = { href: '', name: '', price: 0, description: '', bought: false, buyer: undefined, wisher:undefined};
   editedItem: Item| null = null;
   editingIndex: number | null = null;
   isAddFormVisible = false; // Initially hidden


    constructor(private userService: UserService) {}

    ngOnInit() {
       this.userService.username$.subscribe((name:string) => {
         this.username = name;
       });
    }

    toggleAddForm() {
       this.isAddFormVisible = !this.isAddFormVisible;
     }


 deleteItem(index: number) {
    this.itemDeleted.emit(index); // Notify parent component to handle deletion
  }

  editItem(index: number) {
      this.isEditing = true;
      this.editingIndex = index;
      this.editedItem = { ...this.items[index] }; // Make a copy of the item to edit
    }

   saveChanges() {
    if (this.editingIndex !== null && this.editedItem) {

        const updatedItem: Item = {
               buyer:'',
                wisher:'',
                href: this.editedItem.href || '',
                name: this.editedItem.name || '',
                price: this.editedItem.price || 0,
                description: this.editedItem.description || '',
                bought: this.editedItem.bought ?? false, // Ensure `bought` is not undefined
              };

    this.items[this.editingIndex] = updatedItem;
      this.isEditing = false;
      this.editedItem = null;
      this.editingIndex = null;
    }
  }

  cancelEdit() {
    this.isEditing = false; // Hide the modal without saving changes
    this.editingIndex = null;
  }

  addItem() {
      this.items.push({ ...this.newItem });
      this.newItem = { href: '', name: '', price: 0, description: '',bought: false,buyer: undefined, wisher: undefined };
      this.isAddFormVisible = false; // Hide the form after adding an item
    }
}
