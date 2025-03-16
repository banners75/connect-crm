import { Form, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";


import { getContact, updateContact } from "~/contactsService";

export const loader = async ({
    params, request
}: LoaderFunctionArgs) => {
    console.log('loading contact');

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("token");
    console.log(token);

    if (!token) {
        // If no token is found, redirect the user to the login page
        console.log('redirecting to login');
        return redirect("/login");
    }

    invariant(params.contactId, "Missing contactId param");
    const contact = await getContact(params.contactId, token);

    if (!contact) {
        console.log('contact not found');
        throw new Response("Not Found", { status: 404 });
    }

    console.log(contact);

    return Response.json({ contact });
};

export const action = async ({
    params,
    request,
}: ActionFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");
    const formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true",
    });
};


import type { ContactRecord } from "../data";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getSession } from "~/sessions";

export default function Contact() {

    const { contact } = useLoaderData<typeof loader>();


    return (
        <div id="contact">
            <div>
                <h1>
                    {contact.name ? (
                        <>
                            {contact.name}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.email ? <p>{contact.email}</p> : null}
                {contact.phone ? <p>{contact.phone}</p> : null}
                {contact.notes ? <p>{contact.notes}</p> : null}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>

                    <Form
                        action="destroy"
                        method="post"
                        onSubmit={(event) => {
                            const response = confirm(
                                "Please confirm you want to delete this record."
                            );
                            if (!response) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

const Favorite: FunctionComponent<{
    contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
    const fetcher = useFetcher();
    const favorite = fetcher.formData
        ? fetcher.formData.get("favorite") === "true"
        : contact.favorite;

    return (
        <fetcher.Form method="post">
            <button
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
                name="favorite"
                value={favorite ? "false" : "true"}
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
};
