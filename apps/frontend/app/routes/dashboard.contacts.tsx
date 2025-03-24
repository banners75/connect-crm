import {
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,

} from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getContacts, createEmptyContact } from "~/contactsService";
import appStylesHref from "~/app.css?url";
import { requireUserSession } from "~/sessions";
import { DataTable } from "~/contacts/data-table";
import { columns } from "~/contacts/columns";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref },];

export const loader = async ({request}: LoaderFunctionArgs) => {

  const session = await requireUserSession(request);
  const url = new URL(request.url);
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
      <ScrollRestoration />
      <Scripts />
    </div>
  );
}
