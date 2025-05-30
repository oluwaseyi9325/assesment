"use client"

import { useState, useEffect } from "react"
import { Filter, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserTable } from "@/components/user-table"
import { NewUserDialog } from "@/components/new-user-dialog"
import { EditUserDialog } from "@/components/edit-user-dialog"
import { DeleteUserDialog } from "@/components/delete-user-dialog"
import type { UserType } from "@/types/user"
import { fetchUsers } from "@/lib/api"

export function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false)
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false)
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers()
        setUsers(data)
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getUsers()
  }, [])

  const handleAddUser = (newUser: UserType) => {
    setUsers([...users, newUser])
  }

  const handleUpdateUser = (updatedUser: UserType) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const handleEditClick = (user: UserType) => {
    setSelectedUser(user)
    setEditUserDialogOpen(true)
  }

  const handleDeleteClick = (user: UserType) => {
    setSelectedUser(user)
    setDeleteUserDialogOpen(true)
  }

  const filteredUsers = users.filter(
    (user) =>
      user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="px-10">
      <div className="mb-6">
        <div className="flex items-center">
          <div>
            <h2 className="text-sm text-[#98A2B3]">Settings / Users & Roles Settings</h2>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-semibold mb-1">Users & Roles</h1>
        <p className="text-[#98A2B3] mb-4">Manage all users in your business</p>

        <div className="flex space-x-4 border-b mb-4">
          <Button variant="link" className="text-blue-600 border-b-2 border-blue-600 rounded-none px-4 py-2">
            Users
          </Button>
          <Button variant="link" className="text-muted-foreground px-4 py-2">
            Roles
          </Button>
        </div>

        <div className="flex justify-between mb-4 bg-white p-4 rounded">
          <div className="flex gap-2">
            <Input
              placeholder="Search here..."
              className="w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          <Button onClick={() => setNewUserDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New User
          </Button>
        </div>

        <UserTable users={filteredUsers} isLoading={isLoading} onEdit={handleEditClick} onDelete={handleDeleteClick} />
      </div>

      <NewUserDialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen} onUserAdded={handleAddUser} />

      {selectedUser && (
        <>
          <EditUserDialog
            user={selectedUser}
            open={editUserDialogOpen}
            onOpenChange={setEditUserDialogOpen}
            onUserUpdated={handleUpdateUser}
          />

          <DeleteUserDialog
            user={selectedUser}
            open={deleteUserDialogOpen}
            onOpenChange={setDeleteUserDialogOpen}
            onUserDeleted={handleDeleteUser}
          />
        </>
      )}
    </div>
  )
}
