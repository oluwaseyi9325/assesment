"use client"

import type { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (

    <>
      <TopNav />
      <div className="flex min-h-screen bg-[#F0F2F5] p-10">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-0">{children}</main>
        </div>
      </div>
    </>
  )
}
