// src/app/models/item.interface.ts
export interface Item {
  href: string | undefined;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
   bought: boolean;
   buyer: string  | undefined;
   wisher: string  | undefined;
}


// src/app/models/item.interface.ts
export interface MyItem {
  href: string | undefined;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
}

export interface ItemWithWisher extends MyItem {
  wisher: string;
}
