import { Component } from '@angular/core';

@Component({
  selector: 'app-my-presents',
  templateUrl: './my-presents.component.html',
  styleUrl: './my-presents.component.scss'
})
export class MyPresentsComponent {



    objectList = [
      {
        href: 'https://example.com/item1',
        name: 'Item 1',
        price: 19.99,
        description: 'This is the description for Item 1.'
      },
      {
        href: 'https://example.com/item2',
        name: 'Item 2',
        price: 29.99,
        description: 'This is the description for Item 2.'
      },
      {
        href: 'https://example.com/item3',
        name: 'Item 3',
        price: 39.99,
        description: 'This is the description for Item 3.'
      }
    ];

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
