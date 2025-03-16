import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, redirect } from "@remix-run/react";
import { commitSession, getSession } from "~/sessions";
import appStylesHref from "~/app.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref },];

type ActionData = { error?: string };

export async function loader({ request }: LoaderFunctionArgs) {

  const session = await getSession(
    request.headers.get("Cookie")
  );

  const data = { error: session.get("error") };

  return Response.json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}


export const action = async ({ request }: { request: Request }) => {

  const session = await getSession(
    request.headers.get("Cookie")
  );

  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    console.log("Invalid username/password");
    session.flash("error", "Invalid username/password");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const data = await response.json();
  session.set("token", data.access_token);
  console.log('session was set');

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function LoginPage() {
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <h2>Login</h2>
      {actionData?.error && (
        <p>{actionData.error}</p>
      )}
      <Form method="post">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
          />
        </div>
        <button type="submit">
          Login
        </button>
      </Form>
    </div>
  );
}
