import * as React from "react"

import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Bell, Trash2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link } from "@remix-run/react";
import { analytics } from "~/utils/analytics";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/avatar.jpg",
  },
  navMain: [
    {
      title: "Leads",
      items: [
        {
          title: "Contacts",
          url: "/dashboard/contacts",
          isActive: true,
        },
      ],
    },
  ],
}


type Notification = {
  id: string;
  message: string;
};

export function AppSidebar({ notifications, onDeleteNotification, ...props }: React.ComponentProps<typeof Sidebar> & { notifications: Notification[], onDeleteNotification: (id: number) => void }) {

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="relative flex items-center">
          {/* 🔔 Notification Bell with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative cursor-pointer">
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 h-5 w-5">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white text-black shadow-lg rounded-md p-2">
              <h4 className="text-sm font-semibold px-2 py-1">Notifications</h4>
              {notifications.length === 0 ? (
                <DropdownMenuItem className="text-gray-500">No new notifications</DropdownMenuItem>
              ) : (
                notifications.map((notif) => (
                  <DropdownMenuItem key={notif.id} className="flex items-center gap-2">
                    <span>{notif.message}</span>
                    <button
                       onClick={(e) => {
                        e.stopPropagation(); 
                        onDeleteNotification(+notif.id); 
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link to={item.url} onClick={ () => analytics.track("Menu Clicked: Contacts") }>{item.title}</Link>
                      {/* <a href={item.url}>{item.title}</a> */}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}




