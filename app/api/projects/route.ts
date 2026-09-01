import { auth } from "@clerk/nextjs/server"

import { prisma } from "@/lib/prisma"

const DEFAULT_PROJECT_NAME = "Untitled Project"

/** Accept only slug-shaped client IDs so the project ID can double as a room ID. */
const ROOM_ID_PATTERN = /^[a-z0-9-]+$/

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  })

  return Response.json({ projects })
}

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

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
  const name =
    typeof rawName === "string" && rawName.trim().length > 0
      ? rawName.trim()
      : DEFAULT_PROJECT_NAME

  const rawId =
    body && typeof body === "object" && "id" in body
      ? (body as { id?: unknown }).id
      : undefined
  const id =
    typeof rawId === "string" && ROOM_ID_PATTERN.test(rawId) ? rawId : undefined

  const project = await prisma.project.create({
    data: { name, ownerId: userId, ...(id ? { id } : {}) },
  })

  return Response.json({ project }, { status: 201 })
}
