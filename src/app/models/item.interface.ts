// src/app/models/item.interface.ts
export interface Item {
  href: string | undefined;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
   bought: boolean; // New property
}
