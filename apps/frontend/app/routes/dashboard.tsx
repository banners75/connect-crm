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
import { useTrackUserLogin } from "~/hooks/use-track-login";

export const loader = protectedLoader( async ({ userSession }) => {
  const currentNotifications = await getNotifications(userSession.token, userSession.username);
  return Response.json({ ...userSession, currentNotifications });
});

export default function App() {

  const { hasToken, token, username, currentNotifications } = useLoaderData<typeof loader>();
  let mappedNotifications = mapNotifications(currentNotifications);

  useTrackUserLogin(token, username);

  const [notifications, setNotifications] = useState(mappedNotifications || []);
  const refreshedNotifications = useNotifications(token, username, notifications);

  function deleteNotificationHandler(id: number): void {

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
