import { EditorShell } from "@/components/editor/editor-shell"
import { getUserProjects } from "@/lib/projects"
import type { Project } from "@/types/project"

export default async function EditorPage() {
  const { owned, shared } = await getUserProjects()

  const projects: Project[] = [
    ...owned.map((project) => ({
      id: project.id,
      name: project.name,
      role: "owner" as const,
    })),
    ...shared.map((project) => ({
      id: project.id,
      name: project.name,
      role: "collaborator" as const,
    })),
  ]

  return <EditorShell projects={projects} />
}
