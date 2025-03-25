import { matchSorter } from "match-sorter";
import { redirect } from "@remix-run/react";

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

export async function getContacts(token?: string, query?: string | null) {

  let response = await fetch("http://localhost:3000/contacts", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw redirect("/logout")
    }
    throw new Error(`Failed to fetch contacts: ${response.statusText}`);
  }

  let contacts = await response.json();

  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["name"],
    });
  }

  return contacts;
}

export async function createEmptyContact() {
  const newContact = { id: "", name: "", email: "", phone: "", notes: "", owner: "", favourite: false };
  return newContact;
}

export async function getContact(id: string, token?: string) {
  let contact = await fetch(`http://localhost:3000/contacts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return contact.json();
}

export async function updateContact(id: string, updates: ContactMutation, token?: string) {

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

