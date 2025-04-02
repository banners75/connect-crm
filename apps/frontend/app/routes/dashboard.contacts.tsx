"use client"


import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useEffect, useState } from "react"
import { Mail, Phone, Plus, User } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

import { Form as UIForm, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"

import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,

} from "@remix-run/react";

import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ContactRecord, createContact, getContacts } from "~/services/contactsService";
import { requireUserSession } from "~/sessions";
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { protectedLoader } from "~/utils/protectedLoader";


export const loader = protectedLoader(async ({ userSession }) => {
  const contacts = await getContacts(userSession.token);
  return Response.json({ contacts });
});

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  owner: z.string().nonempty({ message: "Owner is required." }),
  notes: z.string().optional(),
})

export const action = async ({ request }: ActionFunctionArgs) => {

  const formData = await request.formData()
  const intent = formData.get("intent")

  if (intent === "create") {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const owner = formData.get("owner") as string
    const notes = formData.get("notes") as string

    try {
      formSchema.parse({
        name,
        email,
        phone,
        owner,
        notes,
      })
    } catch (error) {
      return Response.json({ error: "Invalid form data" }, { status: 400 })
    }

    // Create a new contact
    const newContact = {
      name,
      email,
      phone,
      owner,
      notes,
    }

    const session = await requireUserSession(request);
    const token = session.token;
    createContact(newContact, token);

    return Response.json({ success: true, contact: newContact })
  }

  return null
}


export default function ContactsPage() {

  const { contacts } = useLoaderData<{ contacts: any[] }>();
  const [selectedContact, setSelectedContact] = useState<ContactRecord | null>(null)

  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const submit = useSubmit()

  const [isAddingContact, setIsAddingContact] = useState(false)

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      owner: "",
      notes: "",
    },
  })

  // Reset form and close add mode when a new contact is successfully added
  useEffect(() => {
    if (actionData?.success) {
      setIsAddingContact(false)
      form.reset()
    }
  }, [actionData, form])

  const onSubmit = (data: { [s: string]: unknown } | ArrayLike<unknown>) => {
    const formData = new FormData()
    formData.append("intent", "create")

    // Add all form fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    submit(formData, { method: "post" })
  }

  const handleAddNewClick = () => {
    setSelectedContact(null)
    setIsAddingContact(true)
    form.reset()
  }

  const handleCancel = () => {
    setIsAddingContact(false)
    form.reset()
  }

  const isSubmitting = navigation.state === "submitting"

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">Manage your contacts and view their details.</p>
        </div>
        <Button onClick={handleAddNewClick}>
          <Plus className="mr-2 h-4 w-4" /> Add Contact
        </Button>
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
                onClick={() => {
                  setSelectedContact(contact)
                  setIsAddingContact(false)
                }}
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

      {isAddingContact ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Contact</CardTitle>
            <CardDescription>Enter the details for the new contact</CardDescription>
          </CardHeader>
          <UIForm {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner</FormLabel>
                        <FormControl>
                          <Input placeholder="A username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional information about this contact"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex pt-4 justify-between">
                <Button variant="outline" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Contact"}
                </Button>
              </CardFooter>
            </form>
          </UIForm>
        </Card>
      ) : selectedContact ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{selectedContact.name}</CardTitle>
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







