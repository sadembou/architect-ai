"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { slugify } from "@/lib/slugify"
import type { Project } from "@/types/project"

type ProjectDialog = "create" | "rename" | "delete" | null

interface UseProjectActionsOptions {
  /**
   * The room ID of the workspace currently open, if any. When a delete targets
   * this project the user is redirected back to `/editor` instead of refreshed.
   */
  activeRoomId?: string
}

/** Short, URL-safe suffix that keeps room IDs unique across similar names. */
function generateSuffix(): string {
  return Math.random().toString(36).slice(2, 8)
}

export function useProjectActions({ activeRoomId }: UseProjectActionsOptions = {}) {
  const router = useRouter()

  const [dialog, setDialog] = useState<ProjectDialog>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [name, setName] = useState("")
  const [suffix, setSuffix] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const slug = slugify(name)
  const roomId = slug ? `${slug}-${suffix}` : ""

  function openCreateDialog() {
    setActiveProject(null)
    setName("")
    setSuffix(generateSuffix())
    setDialog("create")
  }

  function openRenameDialog(project: Project) {
    setActiveProject(project)
    setName(project.name)
    setDialog("rename")
  }

  function openDeleteDialog(project: Project) {
    setActiveProject(project)
    setDialog("delete")
  }

  function closeDialog() {
    setDialog(null)
    setActiveProject(null)
    setName("")
    setSuffix("")
    setIsSubmitting(false)
  }

  async function submitCreate() {
    const trimmedName = name.trim()
    if (!trimmedName || isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Keep the project ID and Liveblocks room ID aligned. Fall back to the
        // schema's `cuid()` default when the name has no slug.
        body: JSON.stringify(roomId ? { id: roomId, name: trimmedName } : { name: trimmedName }),
      })

      if (!response.ok) {
        throw new Error("Failed to create project")
      }

      const { project } = (await response.json()) as { project: { id: string } }
      closeDialog()
      router.push(`/editor/${project.id}`)
    } catch (error) {
      setIsSubmitting(false)
      throw error
    }
  }

  async function submitRename() {
    const trimmedName = name.trim()
    if (!activeProject || !trimmedName || isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/projects/${activeProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName }),
      })

      if (!response.ok) {
        throw new Error("Failed to rename project")
      }

      closeDialog()
      router.refresh()
    } catch (error) {
      setIsSubmitting(false)
      throw error
    }
  }

  async function submitDelete() {
    if (!activeProject || isSubmitting) return

    const targetId = activeProject.id
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/projects/${targetId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      closeDialog()
      if (activeRoomId === targetId) {
        router.push("/editor")
      } else {
        router.refresh()
      }
    } catch (error) {
      setIsSubmitting(false)
      throw error
    }
  }

  return {
    dialog,
    activeProject,
    name,
    roomId,
    isSubmitting,
    setName,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    submitCreate,
    submitRename,
    submitDelete,
  }
}
