import {
  Form,
  NavLink,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  Links,
  useNavigation,
  useSubmit,
} from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Key, useEffect } from "react";
import appStylesHref from "~/app.css?url";
import { createEmptyContact, getContacts } from "~/data";
import { requireUserSession } from "~/sessions";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref },];

export const loader = async ({request,}: LoaderFunctionArgs) => {

  const session = await requireUserSession(request);
  
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return Response.json({ contacts, q });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contactsExample/${contact.id}/edit`);
};

export default function App() {

  const { contacts, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);


  return (
    <div id="sidebarContainer">
      <div id="sidebar">
        <h1>Remix Contacts</h1>
        <div>
          <Form
            id="search-form"
            onChange={(event) => {
              const isFirstSearch = q === null;
              submit(event.currentTarget, {
                replace: !isFirstSearch,
              });
            }}
            role="search">
            <input
              id="q"
              aria-label="Search contacts"
              className={navigation.state === "loading" && !searching ? "loading" : ""}
              defaultValue={q || ""}
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact: { id: Key | null | undefined; first: string; last: string; favorite: boolean; }) => (
                <li key={contact.id}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                          ? "pending"
                          : ""
                    }
                    to={`${contact.id}`}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite ? (
                      <span>★</span>
                    ) : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div className={navigation.state === "loading" ? "loading" : ""} id="detail">
        <Outlet />
      </div>

      <ScrollRestoration />
      <Scripts />
    </div>
  );
}
