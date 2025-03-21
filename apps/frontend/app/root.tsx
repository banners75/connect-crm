import {
  Meta,
  Outlet,
  Links,
  useLoaderData,
} from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import appStylesHref from "./app.css?url";
import Navbar from "./components/Navbar";
import { getSession } from "./sessions";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref },];

export const loader = async ({ request }: LoaderFunctionArgs) => {

  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const hasToken = session.has("token");

  return Response.json({ hasToken });
}

export default function App() {

  const { hasToken } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
          <Navbar hasToken={hasToken}/>
          <Outlet />
      </body> 
    </html>
  );
}
