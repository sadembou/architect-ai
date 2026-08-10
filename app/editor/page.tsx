"use client"

import { useState } from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import {ProjectSidebar} from "@/components/editor/project-sidebar"


export default function EditorPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="flex flex-col h-screen bg-bg-base">
        <EditorNavbar isSidebarOpen={isSidebarOpen} 
            onToggleSidebar={()=>setIsSidebarOpen((prev) => !prev)}
        />
        <ProjectSidebar isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
        />
        <main className="flex-1 overflow-hidden"/>
    </div>
  )
}

