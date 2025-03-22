import { useEffect, useState } from "react";

export default function Index() {

  const [notifications, setNotifications] = useState<{ message: string; recipient: string }[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3000/notifications/stream');

    eventSource.onmessage = (event) => {
      console.log("New Event:", event.data);
      const newNotification = JSON.parse(event.data); // Ensure correct parsing
      setNotifications((prev) => [...prev, newNotification]);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close(); // Close connection on error
    };

    return () => {
      eventSource.close(); // Cleanup on component unmount
    };
  }, []);


  return (
    <div style={{ paddingLeft: "30px" }}>
      <p id="index-page">
        
      </p>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>
            {notif.recipient}: {notif.message}
          </li>
        ))}
      </ul>
   
    </div>
  );
}
