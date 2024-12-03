import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {Item} from './models/item.interface';

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

  get(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

post(item: Item): Observable<Item> {
  return this.http.post<Item>(this.apiUrl, item);
}


delete(id: number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${id}`);
}

put(item: Item): Observable<Item> {
  return this.http.put<Item>(`${this.apiUrl}/${item.id}`, item);
}



}
