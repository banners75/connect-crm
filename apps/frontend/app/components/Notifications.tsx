import { useState } from "react";
import { Bell } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const notifications = [
  { id: 1, message: "New comment on your post" },
  { id: 2, message: "You have a new follower" },
  { id: 3, message: "Your report has been approved" },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span>
          <Button variant="ghost" className="relative">
            <Bell className="w-6 h-6" />
            {notifications.length > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white px-2 text-xs rounded-full">
                {notifications.length}
              </Badge>
            )}
          </Button>
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2 shadow-lg bg-white rounded-lg absolute top-full left-0 mt-2">
        <Card>
          <CardContent className="p-2 space-y-2">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No new notifications</p>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className="p-2 border-b last:border-none text-sm">
                  {notification.message}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
