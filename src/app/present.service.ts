import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, from } from 'rxjs';
import {Item} from './models/item.interface';

import {
  addPresent,
  getPresents,
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

   private apiUrl = 'http://localhost:5000/items';

  constructor(private http: HttpClient) { }

  get(): Observable<Item[]> {
    //return this.http.get<Item[]>(this.apiUrl);
    return from(getPresents());
  }

post(item: Item): Observable<any> {

     const sanitizedItem = {
            ...item,
            buyer: item.buyer || "", // Provide a default value if 'buyer' is undefined
            id: Date.now()
          };

    return from(addPresent(sanitizedItem));
}


delete(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`);
}

put(item: Item): Observable<Item> {
  return this.http.put<Item>(`${this.apiUrl}/${item.id}`, item);
}



}
