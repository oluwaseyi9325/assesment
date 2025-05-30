"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { UserType } from "@/types/user"
import { deleteUser } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Trash2 } from "lucide-react"

interface DeleteUserDialogProps {
  user: UserType
  open: boolean
  onOpenChange: (open: boolean) => void
  onUserDeleted: (userId: string) => void
}

export function DeleteUserDialog({ user, open, onOpenChange, onUserDeleted }: DeleteUserDialogProps) {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      await deleteUser(user.id)

      onUserDeleted(user.id)
      toast({
        title: "Success",
        description: "User has been deleted successfully",
      })

      onOpenChange(false)
    } catch (error) {
      console.error("Failed to delete user:", error)
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">Delete this user</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center">
          <p className="text-muted-foreground">
            This user and all associated data will be permanently removed. Do you wish to continue?
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
            Cancel action
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="gap-2">
            <Trash2 className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
