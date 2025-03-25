import { matchSorter } from "match-sorter";
import { redirect } from "@remix-run/react";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  owner: string;
  notes: string;
  favourite: boolean;
}

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

async function apiFetch(endpoint: string, options: RequestInit, token?: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

  if (!response.ok) {
    if (response.status === 401) {
      throw redirect("/logout");
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getContacts(token?: string, query?: string | null): Promise<Contact[]> {
  let contacts = await apiFetch("/contacts", { method: "GET" }, token);

  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["name"] });
  }

  return contacts;
}

export async function createEmptyContact(): Promise<Contact> {
  return {
    id: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
    owner: "",
    favourite: false,
  };
}

export async function getContact(id: string, token?: string): Promise<Contact | null> {
  const contact = await apiFetch(`/contacts/${id}`, { method: "GET" }, token);
  if (!contact) {
    throw new Error(`Contact with ID ${id} not found`);
  }
  return contact;
}

export async function updateContact(id: string, updates: Partial<Contact>, token?: string): Promise<Contact> {
  return apiFetch(`/contacts/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  }, token);
}

export async function deleteContact(id: string, token?: string): Promise<void> {
  await apiFetch(`/contacts/${id}`, { method: "DELETE" }, token);
}

