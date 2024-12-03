import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.interface';
import { User, UserService } from '../user.service'
import { PresentService } from '../present.service'

@Component({
  selector: 'app-all-presents',
  templateUrl: './all-presents.component.html',
  styleUrl: './all-presents.component.scss'
})
export class AllPresentsComponent implements OnInit{


    username = ''
    isEditing = false;
    editedItem: Item| null = null;
    editingIndex: number | null = null;

     objectList: Item[] =  [
          {
            href: 'https://example.com/item1',
            name: 'Item 1',
            price: 19.99,
            description: 'This is the description for Item 1.',
            bought: true,
                  buyer:'Jonas',
                  wisher:'Jenny'
          },
          {
            href: 'https://example.com/item2',
            name: 'Item 2',
            price: 29.99,
            description: 'This is the description for Item 2.',
            bought: true,
            buyer:'Jonas',
             wisher:'john_doe'
          },
          {
            href: 'https://example.com/item3',
            name: 'Item 3',
            price: 39.99,
            description: 'This is the description for Item 3.',
            bought: false,
            buyer:'',
             wisher:'Sonia'
          }
        ];


     constructor(private userService: UserService, private presentService: PresentService) {}

        ngOnInit() {
            this.userService.username$.subscribe((name:string) => {
               // this.username = name;

            });

             this.username = this.userService.getUser();
              console.log("FOO user name", this.username)
        }


toggleBought(index: number) {
    if (this.objectList[index]) {
      this.objectList[index].bought = !this.objectList[index].bought;
    }
  }

    onItemDeleted(index: number) {
      this.objectList.splice(index, 1); // Remove the item from the list
    }

    onItemEdited(event: { index: number; item: any }) {
      const updatedName = prompt('Edit name:', event.item.name);
      if (updatedName !== null) {
        this.objectList[event.index].name = updatedName;
      }
    }



filteredList(): Item[] {
  return this.objectList.filter(item => item.wisher !== this.username);
}


}
