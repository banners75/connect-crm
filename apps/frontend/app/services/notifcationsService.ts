import { redirect } from "@remix-run/react";

export async function getNotifications(token?: string, username?: string) {

  const response = await fetch("http://localhost:3000/notifications", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw redirect("/logout")
    }
    throw new Error(`Failed to fetch notifications: ${response.statusText}`);
  }

  const notifications = (await response.json()).filter((notification: Notification) => {
    return notification.recipient === username && !notification.read;
  }).sort((a: Notification, b: Notification) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
  
  return notifications;
}

export async function markNotificationAsRead(token: string, notificationId: number) {

  return fetch(`http://localhost:3000/notifications/${notificationId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }).then((response) => response.json());
}

type Notification = {
  id: string;
  message: string;
  recipient: string;
  read: boolean;
  dateCreated: Date;
};