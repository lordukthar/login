import db from "./firebase.config";
import { filter } from 'rxjs/operators';

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore/lite";

import {Item} from './models/item.interface';

let collection_name = "presents";


export const deletePresent = async (item: Item): Promise<Item> => {

     const a = item.firebaseID || ''
  // Directly reference the document by its ID
  const docRef = doc(db, collection_name, a);

  // Delete the document
  await deleteDoc(docRef);

  return item;
};



export const updatePresent = async (item: Item): Promise<Item> => {

    const a = item.firebaseID || ''

    if (a) {
      // Reference to the specific document in Firestore
      const docRef = doc(db, collection_name, a);
      // Update the entire document with the item fields
      await updateDoc(docRef, { ...item });
  }

  // Return the updated item
  return item;
};

export const getPresents = async (): Promise<Item[]> => {
  const citiesCol = collection(db, collection_name);
  const citySnapshot = await getDocs(citiesCol);

  const presents: Item[] = citySnapshot.docs
    .map((doc) => {
      const data = doc.data() as Item;
      if (
        typeof data.href === 'string' &&
        typeof data.name === 'string' &&
        typeof data.price === 'number' &&
        typeof data.description === 'string' &&
        typeof data.bought === 'boolean' &&
        typeof data.buyer === 'string' &&
        typeof data.wisher === 'string' &&
         typeof data.id === 'number'
      ) {
       const item: Item = {
                 href: data.href,
                 name: data.name,
                 price: data.price,
                 description: data.description,
                 bought: data.bought,
                 buyer: data.buyer,
                 wisher: data.wisher,
                 id: data.id, // Add id explicitly
                 firebaseID: doc.id
               };
               return item;
      } else {
        console.warn('Invalid data:', data);
        return null;
      }
    })
    .filter((item: Item | null): item is Item => item !== null); // Narrow type to Item

  return presents;
};


export const addPresent = async (item: Item): Promise<Item> => {

   const docRef = await addDoc(collection(db, collection_name), item);
   const itemWithId: Item = {
       ...item,
       firebaseID: docRef.id, // Firestore generates an ID for the document
     };

     // Return the item with the added ID
     return itemWithId;
 };
