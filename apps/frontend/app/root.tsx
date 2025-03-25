import {
  Meta,
  Outlet,
  Links,
  useLoaderData,
  Scripts,
} from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import appStylesHref from "./styles/app.css?url";
import { getSessionData } from "./sessions";
import { getNotifications } from "./services/notifcationsService";
import LeftNav from "./components/leftnav";
import { mapNotifications, useNotifications } from "./hooks/use-notifications";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref },];

export const loader = async ({ request }: LoaderFunctionArgs) => {

  const sessionData = await getSessionData(request);

  if (sessionData.hasToken) {
    const currentNotifications  = await getNotifications(sessionData.token, sessionData.username);
    return Response.json({...sessionData, currentNotifications});
  } 
    
  return Response.json(sessionData);
}

export default function App() {

  const { hasToken, token, username, currentNotifications } = useLoaderData<typeof loader>();
  let result;

  if (hasToken) {
    result = mapNotifications(currentNotifications);
  }

  const notifications  = useNotifications(token, username, result);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {hasToken && <LeftNav notifications={notifications} />}
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
