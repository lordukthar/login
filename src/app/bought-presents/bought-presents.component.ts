import { Component } from '@angular/core';

@Component({
  selector: 'app-bought-presents',
  templateUrl: './bought-presents.component.html',
  styleUrl: './bought-presents.component.scss'
})
export class BoughtPresentsComponent {


    objectList = [
      {
        href: 'https://example.com/item1',
        name: 'Item 1',
        price: 19.99,
        description: 'This is the description for Item 1.',
        bought: true
      },
      {
        href: 'https://example.com/item2',
        name: 'Item 2',
        price: 29.99,
        description: 'This is the description for Item 2.',
        bought: true
      },
      {
        href: 'https://example.com/item3',
        name: 'Item 3',
        price: 39.99,
        description: 'This is the description for Item 3.',
        bought: true
      }
    ];

onItemDeleted(index: number) {
  this.objectList.splice(index, 1); // Remove the item from the list
}

}
