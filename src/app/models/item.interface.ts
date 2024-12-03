// src/app/models/item.interface.ts
export interface Item {
    id?: number; // Add the id property
  href: string | undefined;
  name: string | undefined;
  price: number | undefined;
  description: string | undefined;
   bought: boolean;
   buyer?: string  | undefined;
   wisher: string  | undefined;
}

