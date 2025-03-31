
import { useEffect, useState } from "react";

export function useNotifications(token?: string, username?: string, result?: Notification[]) {
    const [notifications, setNotifications] = useState<{ id: string; message: string }[]>(result || []);

    useEffect(() => {
        if (!token || !username) return;

        // TODO: should come from a config file
        const eventSource = new EventSource("http://localhost:3000/notifications/stream");

        eventSource.onmessage = async (event) => {
            console.log("New Event:", event.data);
            const eventData = JSON.parse(event.data);
     
            if (eventData.recipient === username) {
                setNotifications((prevNotifications) => [
                    eventData,
                    ...prevNotifications
                ]);
            }
        };

        eventSource.onerror = (error) => {
            console.error("SSE Error:", error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [token, username]);

    useEffect(() => {
        if (result) {
            setNotifications(result); 
        }
    }, [result]);

    return notifications;
}


export function mapNotifications(notifications: Notification[]) : Notification[] {
    return notifications.map((notification: Notification) => {
        return {
            id: notification.id,
            message: notification.message,
        };
    });
}

export type Notification = {
    id: string;
    message: string;
};
