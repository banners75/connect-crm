import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { requireUserSession } from "~/sessions";

export const loader = async ({request,}: LoaderFunctionArgs) => {
  const session = await requireUserSession(request);

  return Response.json({});
}

export default function Index() {
  return (
    <div>
      <p id="index-page">
        This is a demo for Remix..
        <br />
        Check out{" "}
        <a href="https://remix.run">the docs at remix.run</a>.
      </p>
      <p>
        <Link to={"login"}>Login</Link>
      </p>
      <p>
        <Link to={"contacts"}>Contacts</Link>
      </p>
      <p>
        <Link to={"contactsExample"}>Contacts Example</Link>
      </p>
      <Form method="post" action="/logout">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
