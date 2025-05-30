"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { UserType } from "@/types/user"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface UserTableProps {
  users: UserType[]
  isLoading: boolean
  onEdit: (user: UserType) => void
  onDelete: (user: UserType) => void
}

export function UserTable({ users, isLoading, onEdit, onDelete }: UserTableProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "administrator":
        return "bg-blue-100 text-blue-600"
      case "sales manager":
        return "bg-green-100 text-green-600"
      case "sales representative":
        return "bg-orange-100 text-orange-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  if (isLoading) {
    return (
      <div className="border rounded-md bg-white">
        <div className="grid grid-cols-5 p-4 border-b bg-white">
          <div className="flex items-center gap-2">
            <Checkbox disabled />
            <span className="font-medium">Name</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="font-medium">Email Address</div>
          <div className="font-medium">Role</div>
          <div className="font-medium">Leads Assigned</div>
          <div className="text-right font-medium">Actions</div>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="grid grid-cols-5 p-4 border-b">
            <div className="flex items-center gap-2">
              <Checkbox disabled />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-8" />
            <div className="flex justify-end gap-2">
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className=" rounded-lg bg-white">
      <div className="grid grid-cols-5 p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <Checkbox />
          <span className="font-medium">Name</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Email Address</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Role</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Leads Assigned</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-right font-medium">Actions</div>
      </div>
      {users.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">No users found. Add a new user to get started.</div>
      ) : (
        users.map((user) => (
          <div key={user.id} className="grid grid-cols-5 p-4 border-b bg-white">
            <div className="flex items-center gap-2">
              <Checkbox id={`user-${user.id}`} />
              <label htmlFor={`user-${user.id}`} className="font-medium">
                {user.name}
              </label>
            </div>
            <div>{user.email}</div>
            <div>
              <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                {user.role}
              </Badge>
            </div>
            <div>{user.leadsAssigned || 0}</div>
            <div className="flex justify-end gap-2">
              <Button variant="link" className="text-blue-600" onClick={() => onEdit(user)}>
                Edit
              </Button>
              <Button variant="link" className="text-muted-foreground" onClick={() => onDelete(user)}>
                Remove
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
