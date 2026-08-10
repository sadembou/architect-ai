"use client"

import { useState } from "react"

import { CreateProjectDialog } from "@/components/editor/create-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog"
import { EditorHome } from "@/components/editor/editor-home"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const {
    projects,
    dialog,
    activeProject,
    name,
    slug,
    isSubmitting,
    setName,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    submitCreate,
    submitRename,
    submitDelete,
  } = useProjectDialogs()

  return (
    <div className="flex h-screen flex-col bg-bg-base">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projects}
        onNewProject={openCreateDialog}
        onRenameProject={openRenameDialog}
        onDeleteProject={openDeleteDialog}
      />
      <main className="flex-1 overflow-hidden">
        <EditorHome onNewProject={openCreateDialog} />
      </main>

      <CreateProjectDialog
        open={dialog === "create"}
        name={name}
        slug={slug}
        isSubmitting={isSubmitting}
        onOpenChange={(open) => !open && closeDialog()}
        onNameChange={setName}
        onSubmit={submitCreate}
      />
      <RenameProjectDialog
        open={dialog === "rename"}
        currentName={activeProject?.name ?? ""}
        name={name}
        isSubmitting={isSubmitting}
        onOpenChange={(open) => !open && closeDialog()}
        onNameChange={setName}
        onSubmit={submitRename}
      />
      <DeleteProjectDialog
        open={dialog === "delete"}
        projectName={activeProject?.name ?? ""}
        isSubmitting={isSubmitting}
        onOpenChange={(open) => !open && closeDialog()}
        onConfirm={submitDelete}
      />
    </div>
  )
}
