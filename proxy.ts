import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in"
const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up"

// Project API routes enforce their own auth and return a JSON 401 for
// unauthenticated callers; middleware `auth.protect()` would instead answer a
// non-page fetch with 404, so they opt out of middleware protection here.
const isPublicRoute = createRouteMatcher([
  `${signInUrl}(.*)`,
  `${signUpUrl}(.*)`,
  "/api/projects(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
}
