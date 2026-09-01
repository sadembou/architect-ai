import { auth } from "@clerk/nextjs/server"

import { prisma } from "@/lib/prisma"

interface RouteParams {
  params: Promise<{ projectId: string }>
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await params

  let body: unknown = null
  try {
    body = await request.json()
  } catch {
    body = null
  }

  const rawName =
    body && typeof body === "object" && "name" in body
      ? (body as { name?: unknown }).name
      : undefined

  if (typeof rawName !== "string" || rawName.trim().length === 0) {
    return Response.json({ error: "Name is required" }, { status: 400 })
  }

  const project = await prisma.project.findUnique({ where: { id: projectId } })

  if (!project) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  if (project.ownerId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: { name: rawName.trim() },
  })

  return Response.json({ project: updated })
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { projectId } = await params

  const project = await prisma.project.findUnique({ where: { id: projectId } })

  if (!project) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  if (project.ownerId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  await prisma.project.delete({ where: { id: projectId } })

  return Response.json({ success: true })
}
