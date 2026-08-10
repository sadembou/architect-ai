"use client"

import { useState } from "react"

import { MOCK_PROJECTS } from "@/lib/mock-projects"
import { slugify } from "@/lib/slugify"
import type { Project } from "@/types/project"

type ProjectDialog = "create" | "rename" | "delete" | null

export function useProjectDialogs() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
  const [dialog, setDialog] = useState<ProjectDialog>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const slug = slugify(name)

  function openCreateDialog() {
    setActiveProject(null)
    setName("")
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
    setIsSubmitting(false)
  }

  function submitCreate() {
    const trimmedName = name.trim()
    const slugValue = slugify(trimmedName)

    if (!trimmedName) return
    if (!slugValue) {
      throw new Error("Project name must include at least one supported letter or number.")
    }

    setIsSubmitting(true)
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: trimmedName,
      slug: slugValue,
      role: "owner",
    }
    setProjects((prev) => [...prev, newProject])
    closeDialog()
  }

  function submitRename() {
    const trimmedName = name.trim()
    const slugValue = slugify(trimmedName)

    if (!activeProject || !trimmedName) return
    if (!slugValue) {
      throw new Error("Project name must include at least one supported letter or number.")
    }

    setIsSubmitting(true)
    setProjects((prev) =>
      prev.map((project) =>
        project.id === activeProject.id
          ? { ...project, name: trimmedName, slug: slugValue }
          : project
      )
    )
    closeDialog()
  }

  function submitDelete() {
    if (!activeProject) return

    setIsSubmitting(true)
    setProjects((prev) =>
      prev.filter((project) => project.id !== activeProject.id)
    )
    closeDialog()
  }

  return {
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
  }
}
