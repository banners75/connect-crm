import { Form, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";
import { getContact, updateContact, ContactRecord } from "~/contactsService";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getSession } from "~/sessions";

export const loader = async ({
    params, request
}: LoaderFunctionArgs) => {
    console.log('loading contact');

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("token");
    console.log(token);
;
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

    const session = await getSession(request.headers.get("Cookie"));
    const token = session.get("token");
    console.log(token);
;
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

    const formData = await request.formData();
    return updateContact(params.contactId, {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        notes: contact.notes,
        owner: contact.owner,
        favourite: formData.get("favourite") === "true",
    }, token);
};

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
    contact: Pick<ContactRecord, "favourite">;
}> = ({ contact }) => {
    const fetcher = useFetcher();
    const favourite = fetcher.formData
        ? fetcher.formData.get("favourite") === "true"
        : contact.favourite;

    return (
        <fetcher.Form method="post">
            <button
                aria-label={
                    favourite
                        ? "Remove from favourites"
                        : "Add to favourites"
                }
                name="favourite"
                value={favourite ? "false" : "true"}
            >
                {favourite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
};
