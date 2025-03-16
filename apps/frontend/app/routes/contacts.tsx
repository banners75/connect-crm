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
import { getContacts, createEmptyContact } from "~/contactsService";
import { Key, useEffect } from "react";
import appStylesHref from "~/app.css?url";
import { getSession } from "~/sessions";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref },];

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {

  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  console.log(token);

  if (!token) {
    console.log('redirecting to login');
    return redirect("/login");
  }

  const contacts = await getContacts(token);

  console.log(contacts);

  return Response.json({ contacts });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/${contact.id}/edit`);
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
        <h1>Connect Contacts</h1>
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
              {contacts.map((contact: { id: Key | null | undefined; name: string; favorite: boolean; }) => (
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
                    {contact.name ? (
                      <>
                        {contact.name}
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
