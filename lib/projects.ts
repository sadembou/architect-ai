import { auth, currentUser } from "@clerk/nextjs/server"

import type { Project } from "@/app/generated/prisma/client"
import { prisma } from "@/lib/prisma"

export interface UserProjects {
  owned: Project[]
  shared: Project[]
}

/**
 * Fetch the current user's owned and shared projects.
 *
 * - Owned: `ownerId` matches the Clerk user ID.
 * - Shared: the user's primary email is listed as a collaborator (and they are
 *   not already the owner).
 *
 * Returns empty lists when there is no authenticated user.
 */
export async function getUserProjects(): Promise<UserProjects> {
  const { userId } = await auth()

  if (!userId) {
    return { owned: [], shared: [] }
  }

  const user = await currentUser()
  const email = user?.primaryEmailAddress?.emailAddress ?? null

  const [owned, shared] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
    }),
    email
      ? prisma.project.findMany({
          where: {
            ownerId: { not: userId },
            collaborators: { some: { email } },
          },
          orderBy: { createdAt: "desc" },
        })
      : Promise.resolve([]),
  ])

  return { owned, shared }
}
