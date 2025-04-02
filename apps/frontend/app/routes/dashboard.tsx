import {
  useLoaderData,
  Scripts,
} from "@remix-run/react";

import { getNotifications, markNotificationAsRead } from "../services/notifcationsService";
import LeftNav from "../components/leftnav";
import { mapNotifications, useNotifications } from "../hooks/use-notifications";
import { useEffect, useState } from "react";
import { analytics } from "~/utils/analytics";
import { protectedLoader } from "~/utils/protectedLoader";

export const loader = protectedLoader( async ({ userSession }) => {
  const currentNotifications = await getNotifications(userSession.token, userSession.username);
  return Response.json({ ...userSession, currentNotifications });
});

export default function App() {

  console.log("Dashboard route loaded");

  const { hasToken, token, username, currentNotifications } = useLoaderData<typeof loader>();
  let mappedNotifications;

  mappedNotifications = mapNotifications(currentNotifications);

  useEffect(() => {
    if (token) {
      console.log(`Token changed: ${token}`);
      console.log("Token changed, identifying user in Mixpanel");
      analytics.identify(username);
      analytics.setUserProperties({
        username: username,
      });
      analytics.track("User logged in", {
        username: username
      });
    }
  }, [token]); // will not re-identify if token is not changed (ie user is still logged in)

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
