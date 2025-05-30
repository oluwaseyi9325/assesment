"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Shield, Bell, DollarSign, ShoppingCart, Users, Database, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Account",
      icon: User,
      href: "/account",
    },
    {
      title: "Security",
      icon: Shield,
      href: "/security",
    },
    {
      title: "Notifications",
      icon: Bell,
      href: "/notifications",
    },
    {
      title: "Pricing",
      icon: DollarSign,
      href: "/pricing",
    },
    {
      title: "Sales",
      icon: ShoppingCart,
      href: "/sales",
    },
    {
      title: "Users & Roles",
      icon: Users,
      href: "/",
      active: true,
    },
    {
      title: "Backups",
      icon: Database,
      href: "/backups",
    },
  ]

  return (
    <div className="w-[240px] border-lg rounded bg-background h-screen flex flex-col">
     
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Settings</h2>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                item.active ? "bg-blue-50 text-blue-600" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto p-4">
        <Button variant="outline" className="w-full justify-start" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
