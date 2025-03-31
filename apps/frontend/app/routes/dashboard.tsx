import {
  useLoaderData,
  Scripts,
} from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { getSessionData } from "../sessions";
import { getNotifications, markNotificationAsRead } from "../services/notifcationsService";
import LeftNav from "../components/leftnav";
import { mapNotifications, useNotifications } from "../hooks/use-notifications";
import { useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {

  const sessionData = await getSessionData(request);

  if (sessionData.hasToken) {
    const currentNotifications = await getNotifications(sessionData.token, sessionData.username);
    return Response.json({ ...sessionData, currentNotifications });
  }

  return Response.json(sessionData);
}

export default function App() {

  const { hasToken, token, username, currentNotifications } = useLoaderData<typeof loader>();
  let mappedNotifications;

  if (hasToken) {
    mappedNotifications = mapNotifications(currentNotifications);
  }

  const [notifications, setNotifications] = useState(mappedNotifications || []);
  const refreshedNotifications = useNotifications(token, username, notifications);

  function deleteNotificationHandler(id: number): void {
    console.log("Delete handler called");
    
    markNotificationAsRead(token, id).then(() => {
      getNotifications(token, username).then((result) => {
        mappedNotifications = mapNotifications(result);
        setNotifications(mappedNotifications);
      });
    });

  }

  return (
    <div>
      {hasToken && <LeftNav notifications={refreshedNotifications} onDeleteNotification={deleteNotificationHandler} />}
      <Scripts />
    </div>
  );
}
