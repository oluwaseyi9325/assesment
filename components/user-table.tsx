"use client"

import { ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { UserType } from "@/types/user"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-white hover:bg-white">
              <TableHead className="w-[50px]">
                <div className="flex items-center gap-2">
                  <Checkbox disabled />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Name</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Email Address</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Role</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Leads Assigned</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead className="text-right">
                <span className="font-medium">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4].map((i) => (
              <TableRow key={i} className="bg-white hover:bg-white">
                <TableCell className="w-[50px]">
                  <Checkbox disabled />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-8" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-9 w-16" />
                    <Skeleton className="h-9 w-20" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-white hover:bg-white">
            <TableHead className="w-[50px]">
              <div className="flex items-center gap-2">
                <Checkbox />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <span className="font-medium">Name</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <span className="font-medium">Email Address</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <span className="font-medium">Role</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-2">
                <span className="font-medium">Leads Assigned</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead className="text-right">
              <span className="font-medium">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <div className="text-muted-foreground">No users found. Add a new user to get started.</div>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className="bg-white hover:bg-white/80">
                <TableCell className="w-[50px]">
                  <Checkbox id={`user-${user.id}`} />
                </TableCell>
                <TableCell>
                  <label htmlFor={`user-${user.id}`} className="font-medium cursor-pointer">
                    {user.name}
                  </label>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.leadsAssigned || 0}</TableCell>
                <TableCell className="text-right">
                  {/* Desktop Actions */}
                  <div className="hidden md:flex justify-end gap-2">
                    <Button variant="link" className="text-blue-600" onClick={() => onEdit(user)}>
                      Edit
                    </Button>
                    <Button variant="link" className="text-muted-foreground" onClick={() => onDelete(user)}>
                      Remove
                    </Button>
                  </div>

                  {/* Mobile Actions */}
                  <div className="md:hidden flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(user)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(user)} className="text-destructive">
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
