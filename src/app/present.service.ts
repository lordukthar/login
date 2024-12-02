import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {Item, MyItem, ItemWithWisher} from './models/item.interface';

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

   private apiUrl = 'http://localhost:5000/presents';

  constructor(private http: HttpClient) { }

     getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.apiUrl);
      }

    add(item: MyItem, wisher:string): Observable<ItemWithWisher> {
        const body: ItemWithWisher = { ...item, wisher };
      return this.http.post<ItemWithWisher>(this.apiUrl, body);
    }

delete(name: string, wisher: string): Observable<any> {
  const body = { name, wisher };  // Prepare the body with the necessary properties

  // Make the HTTP DELETE request
  return this.http.delete<any>(this.apiUrl, { body });
}


}
