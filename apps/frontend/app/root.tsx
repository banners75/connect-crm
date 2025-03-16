import {
  Meta,
  Outlet,
  Links,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import appStylesHref from "./app.css?url";
import Navbar from "./components/Navbar";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref },];

export default function App() {

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
          <Navbar />
          <Outlet />
      </body> 
    </html>
  );
}
