"use client"

import { useEffect, useState } from "react"
import { Mail, Phone, User } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

import {
  MetaFunction,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,

} from "@remix-run/react";

import type { LoaderFunctionArgs } from "@remix-run/node";
import { ContactRecord, getContacts } from "~/services/contactsService";
import { requireUserSession } from "~/sessions";
import { Button } from "~/components/ui/button"


export const loader = async ({request}: LoaderFunctionArgs) => {

  const session = await requireUserSession(request);
  const contacts = await getContacts(session.get("token"));

  return Response.json({ contacts });
};

// export const action = async () => {
//   const contact = await createEmptyContact();
//   return redirect(`/${contact.id}/edit`);
// };



export default function ContactsPage() {

  const { contacts } = useLoaderData<{ contacts: any[] }>();
  const [selectedContact, setSelectedContact] = useState<ContactRecord | null>(null)

  return (  
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground">Manage your contacts and view their details.</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className="cursor-pointer hover:bg-muted/50"
                data-selected={selectedContact?.id === contact.id}
              >
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add New Contact Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => {
            // Navigate to the new contact creation page
            window.location.href = "/dashboard/contacts/new";
          }}
        >
          Add New Contact
        </Button>
      </div>

      {selectedContact ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{selectedContact.name}</CardTitle>
            <CardDescription>
              Placeholder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Email:</span>
                  <span className="text-sm">{selectedContact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Phone:</span>
                  <span className="text-sm">{selectedContact.phone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm font-medium">Owner:</span>
                  <span className="text-sm">{selectedContact.owner}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Notes</h3>
                <p className="text-sm text-muted-foreground">{selectedContact.notes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
            <CardDescription>Select a contact to view their details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-40 text-muted-foreground">
              <p>No contact selected</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


