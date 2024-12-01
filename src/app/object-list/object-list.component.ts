import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../models/item.interface';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent {
  @Input() items: { href: string; name: string; price: number; description: string }[] = [];
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() itemEdited = new EventEmitter<{ index: number; item: any }>();

   @Input() items_i: Item[] = [];
    @Output() itemDeleted_i = new EventEmitter<number>();
    @Output() itemEdited_i = new EventEmitter<{ index: number; item: Item }>();

  isEditing = false;
    newItem = { href: '', name: '', price: 0, description: '' };
  editedItem: any = null;
  editingIndex: number | null = null;
   isAddFormVisible = false; // Initially hidden


    toggleAddForm() {
       this.isAddFormVisible = !this.isAddFormVisible;
     }

  deleteItem(index: number) {
    this.itemDeleted_i.emit(index); // Notify parent component to handle deletion
  }

 deleteItemI(index: number) {
    this.itemDeleted.emit(index); // Notify parent component to handle deletion
  }

  editItem(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
    this.editedItem = { ...this.items[index] }; // Make a copy of the item to edit
  }

  editItemI(index: number) {
      this.isEditing = true;
      this.editingIndex = index;
      this.editedItem = { ...this.items_i[index] }; // Make a copy of the item to edit
    }

  saveChangesI() {
    if (this.editingIndex !== null) {
      this.items_i[this.editingIndex] = { ...this.editedItem }; // Save the changes to the item
      this.isEditing = false; // Hide the modal after saving
      this.editingIndex = null;
    }
  }

  saveChanges() {
    if (this.editingIndex !== null) {
      this.items[this.editingIndex] = { ...this.editedItem }; // Save the changes to the item
      this.isEditing = false; // Hide the modal after saving
      this.editingIndex = null;
    }
  }

  cancelEditI() {
      this.isEditing = false; // Hide the modal without saving changes
      this.editingIndex = null;
    }

  cancelEdit() {
    this.isEditing = false; // Hide the modal without saving changes
    this.editingIndex = null;
  }

  addItem() {
      this.items.push({ ...this.newItem });
      this.newItem = { href: '', name: '', price: 0, description: '' };
      this.isAddFormVisible = false; // Hide the form after adding an item
    }
}
