"use client"

import { useNavigate } from "@remix-run/react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Contact = {
    id: number
    name: string
    email: string
    phone: string
    notes: string
    owner: string
    favourite: boolean
}

function ActionsCell({ contact }: { contact: Contact }) {
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate(`/dashboard/contacts/${contact.id}`)}>
                    View contact
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Mark as favourite</DropdownMenuItem>
                <DropdownMenuItem>Change Owner</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export const columns: ColumnDef<Contact>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "owner",
        header: "Owner",
    },
    {
        accessorKey: "favourite",
        header: "Is Favourite",
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionsCell contact={row.original} />,
    },
]


