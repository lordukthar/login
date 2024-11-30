import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent {
    @Output() itemDeleted = new EventEmitter<number>();
      @Output() itemEdited = new EventEmitter<{ index: number; item: any }>();

  @Input() items: { href: string; name: string; price: number; description: string }[] = [];

deleteItem(index: number) {
    this.itemDeleted.emit(index); // Notify parent component to handle deletion
  }

  editItem(index: number) {
    const itemToEdit = this.items[index];
    this.itemEdited.emit({ index, item: itemToEdit }); // Notify parent component for editing
  }
}
