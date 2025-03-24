// hooks/useNotifications.ts
import { useEffect, useState } from "react";
import { getNotifications } from "~/notifcationsService";

export function useNotifications(token?: string, username?: string, result?: any) {
  const [notifications, setNotifications] = useState<{ id: string; message: string }[]>(result || []);

  useEffect(() => {
    if (!token || !username) return;

    const eventSource = new EventSource("http://localhost:3000/notifications/stream");

    eventSource.onmessage = async (event) => {
      console.log("New Event:", event.data);
      const refreshedNotifications = mapNotifications(await getNotifications(token, username));
      setNotifications(refreshedNotifications);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [token, username]);

  return notifications;
}


export function mapNotifications(notifications: any) {
  return notifications.map((notification: any) => {
    return {
      id: notification.id,
      message: notification.message,
    };
  });
}
