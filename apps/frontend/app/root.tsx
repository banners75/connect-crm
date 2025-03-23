import {
  Meta,
  Outlet,
  Links,
  useLoaderData,
  Scripts,
} from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import appStylesHref from "./app.css?url";
import Navbar from "./components/Navbar";
import { getSession } from "./sessions";
import { useEffect, useState } from "react";
import { getNotifications } from "./notifcationsService";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref },];

export const loader = async ({ request }: LoaderFunctionArgs) => {

  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const hasToken = session.has("token");

  if (!hasToken) {
    return { hasToken };
  }

  const token = session.get("token");
  const username = session.get("username");

  const notifications = await getNotifications(token, username);

  return Response.json({ hasToken, token, username, notifications });
}

export default function App() {

  const { hasToken, token, username, notifications } = useLoaderData<typeof loader>();
  let result;

  if (hasToken) {
    result = notifications.map((notification: any) => {
      return { message: notification.message, recipient: notification.recipient };
    });

    console.log(result);
  }

  const [allNotifications, setNotifications] = useState<{ message: string; recipient: string }[]>(result ? result : []);

  useEffect(() => {

    const eventSource = new EventSource('http://localhost:3000/notifications/stream');

    eventSource.onmessage = async (event) => {
      console.log("New Event:", event.data);
      const refreshedNotifications = await getNotifications(token, username)
      setNotifications(refreshedNotifications);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar hasToken={hasToken} notifications={allNotifications} />
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
