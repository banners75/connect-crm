import {
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,

} from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getContacts, createEmptyContact } from "~/services/contactsService";
import { requireUserSession } from "~/sessions";
import { DataTable } from "~/components/contactsTable/data-table";
import { columns } from "~/components/contactsTable/columns";

export const loader = async ({request}: LoaderFunctionArgs) => {

  const session = await requireUserSession(request);
  const contacts = await getContacts(session.get("token"));

  return Response.json({ contacts });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/${contact.id}/edit`);
};

export default function App() {

  const { contacts } = useLoaderData<typeof loader>();
  
  return ( 
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={contacts} />
      <Outlet />
      <ScrollRestoration />
      <Scripts />
    </div>
  );
}
