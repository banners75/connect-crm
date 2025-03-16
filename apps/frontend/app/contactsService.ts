////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  owner?: string;
  notes?: string;
  favourite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
// const fakeContacts = {
//   records: {} as Record<string, ContactRecord>,

//   async getAll(): Promise<ContactRecord[]> {
//     return Object.keys(fakeContacts.records)
//       .map((key) => fakeContacts.records[key])
//       .sort(sortBy("-createdAt", "last"));
//   },

//   async get(id: string): Promise<ContactRecord | null> {
//     return fakeContacts.records[id] || null;
//   },

  //async create(values: ContactMutation): Promise<ContactRecord> {
    // const id = values.id || Math.random().toString(36).substring(2, 9);
    // const createdAt = new Date().toISOString();
    // const newContact = { id, createdAt, ...values };
    // fakeContacts.records[id] = newContact;
    // return newContact;
  // },

  // async set(id: string, values: ContactMutation): Promise<ContactRecord> {
  //   const contact = await fakeContacts.get(id);
  //   invariant(contact, `No contact found for ${id}`);
  //   const updatedContact = { ...contact, ...values };
  //   fakeContacts.records[id] = updatedContact;
  //   return updatedContact;
  // },

  // destroy(id: string): null {
  //   delete fakeContacts.records[id];
  //   return null;
  // },
// };

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(token: string) {

  let contacts = await fetch("http://localhost:3000/contacts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
      "Content-Type": "application/json",
    },
  });

  return contacts.json();
}

export async function createEmptyContact() {
  // const contact = await fakeContacts.create({});
  // return contact;
}

export async function getContact(id: string, token: string) {
  let contact = await fetch(`http://localhost:3000/contacts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return contact.json();
}

export async function updateContact(id: string, updates: ContactMutation, token: string) {

  let contact = await fetch(`http://localhost:3000/contacts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": updates.name,
      "email": updates.email,
      "phone": updates.phone,
      "notes": updates.notes,
      "owner": updates.owner,
      "favourite": updates.favourite
    }),
  });

  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }

  return contact;
}

export async function deleteContact(id: string) {
  // fakeContacts.destroy(id);
}

