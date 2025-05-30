"use client"

import { Bell, Wallet, HelpCircle, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function TopNav() {

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6 py-4">
      <div className="p-4">
        <div className="h-10 w-10 bg-blue-600 rounded"></div>
      </div>
      <div className="flex-1">
        <Input placeholder="Search here..." className="w-[400px] bg-[#F0F2F5] rounded-lg" />
      </div>
      <nav className="flex items-center gap-4 lg:gap-6">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Wallet className="h-5 w-5" />
          <span className="sr-only">Wallet</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Inquiries</span>
        </Button>
        <Button variant="ghost" size="icon" className="text-blue-600">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  )
}
