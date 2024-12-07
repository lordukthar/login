import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, from } from 'rxjs';
import {Item} from './models/item.interface';

import {
  addPresent,
  getPresents,
  updatePresent,
  deletePresent
} from './firebase.service';

export type User = {
  id: number,
  name: string,
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class PresentService {


  get(): Observable<Item[]> {
    return from(getPresents());
  }

post(item: Item): Observable<Item> {

     const sanitizedItem = {
            ...item,
            buyer: item.buyer || "", // Provide a default value if 'buyer' is undefined
            id: Date.now()
          };

    return from(addPresent(sanitizedItem));
}


delete(item: Item): Observable<Item> {
  return from(deletePresent(item));
}

put(item: Item): Observable<Item> {
     return from(updatePresent(item));
}



}
