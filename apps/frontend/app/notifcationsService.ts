import { redirect } from "@remix-run/react";

export async function getNotifications(token?: string, username?: string) {

  let response = await fetch("http://localhost:3000/notifications", {
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

  let notifications = await response.json();

  

  return notifications;
}