import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent {
  @Input() items: { href: string; name: string; price: number; description: string }[] = [];
  @Output() itemDeleted = new EventEmitter<number>();
  @Output() itemEdited = new EventEmitter<{ index: number; item: any }>();

  isEditing = false;
  editedItem: any = null;
  editingIndex: number | null = null;

  deleteItem(index: number) {
    this.itemDeleted.emit(index); // Notify parent component to handle deletion
  }

  editItem(index: number) {
    this.isEditing = true;
    this.editingIndex = index;
    this.editedItem = { ...this.items[index] }; // Make a copy of the item to edit
  }

  saveChanges() {
    if (this.editingIndex !== null) {
      this.items[this.editingIndex] = { ...this.editedItem }; // Save the changes to the item
      this.isEditing = false; // Hide the modal after saving
      this.editingIndex = null;
    }
  }

  cancelEdit() {
    this.isEditing = false; // Hide the modal without saving changes
    this.editingIndex = null;
  }
}
