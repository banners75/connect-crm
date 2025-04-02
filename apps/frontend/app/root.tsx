import {
  Meta,
  Outlet,
  Links,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import appStylesHref from "./styles/app.css?url";
import PageAnalytics from "./components/page.analytics";

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
        <PageAnalytics />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
