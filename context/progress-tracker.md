# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature: Authentication (03-auth)

## Current Goal

- 03-auth complete. Next: 04-project-dialogs (builds the `/editor` home screen).

## Completed

- 01-design-system: Installed shadcn/ui (base-nova/base-ui preset) with Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea; installed lucide-react; added `lib/utils.ts` `cn()` helper; wired the dark palette from `context/ui-context.md` into `app/globals.css` (shadcn semantic tokens + `bg-base`/`bg-surface`/`bg-elevated`/`bg-subtle`/`border-surface-border`/`text-copy-*`/`text-brand`/`border-brand`/`bg-brand-dim`/`text-accent-text`/error/success/warning utilities); `html` now carries a permanent `dark` class (app is dark-only, no light variant).
- 02-editor-chrome: added `components/editor/editor-navbar.tsx` (fixed-height top bar, left/center/right sections, sidebar toggle button swapping `PanelLeftOpen`/`PanelLeftClose`, `bg-surface` with bottom border), `components/editor/project-sidebar.tsx` (absolutely-positioned floating overlay so it doesn't push canvas content, slides in/out via `translate-x` on `isOpen`, `My Projects`/`Shared` shadcn Tabs with empty placeholder states, full-width `New Project` button with `Plus` icon), and `components/editor/dialog-pattern.tsx` (thin wrapper around `components/ui/dialog.tsx` applying the `rounded-3xl`/`bg-elevated`/token styling from `ui-context.md`, exposing title/description/footer slots — no concrete dialog instances built yet, per spec). `tsc --noEmit` and `eslint` both clean.
- 03-auth: installed `@clerk/ui`; added `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up` to `.env.local` (standard Clerk-recognized vars, weren't previously set — see Architecture Decisions); created `proxy.ts` at the project root (Next.js 16 renamed `middleware.ts` → `proxy.ts`) using `clerkMiddleware` + `createRouteMatcher` from `@clerk/nextjs/server`, reading the two env vars to build the public-route matcher and calling `auth.protect()` on everything else; wrapped `app/layout.tsx` body content in `ClerkProvider` with appearance from new `lib/clerk-appearance.ts` (Clerk's `dark` theme from `@clerk/ui/themes` plus a `variables` map pointing every color/font/radius at the app's existing CSS custom properties — no hardcoded colors); built `components/auth/auth-shell.tsx` and `app/sign-in/[[...sign-in]]/page.tsx` / `app/sign-up/[[...sign-up]]/page.tsx` using it with `<SignIn />`/`<SignUp />`; `app/page.tsx` is now an async server component that calls `auth()` and redirects to `/editor` (signed in) or `/sign-in` (signed out); added `UserButton` to the previously-empty right section of `components/editor/editor-navbar.tsx`. Verified with Playwright screenshots at 1440px and 390px: `/` redirects to `/sign-in`, both auth pages render fully dark (no light-theme Clerk chrome), left panel present on desktop and hidden on mobile, no console errors. `npm run build` and `eslint` both clean.
- 03-auth (design iteration): reworked `components/auth/auth-shell.tsx` per direct user feedback against a reference mockup — added a soft `--accent-primary` radial glow in the top-right of the left panel (via `color-mix()`, no hardcoded colors), enlarged the hero heading to `text-4xl font-bold`, gave each feature list item a lucide icon badge (`Sparkles`/`Share2`/`FileText` in a `bg-elevated` square), a solid `bg-brand` logo mark, and a copyright footer pinned to the bottom. Confirmed via computed-style inspection that both the heading and the Clerk-rendered form text were already resolving to `Geist`/`Geist Fallback` — the earlier "wrong font" read was a weight/size issue, not a font-family one, so no font-loading change was needed. This supersedes the original spec's "no gradients / no feature cards / no oversized hero" for the left panel only — see the amendment note in `03-auth.md`.

## In Progress

- None.

## Next Up

- 04-project-dialogs: builds the `/editor` home screen (this is what `/` and `proxy.ts` redirect authenticated users to — the route doesn't exist yet, so that redirect currently 404s until 04 lands) plus Create/Rename/Delete project dialogs with mock data.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- `bg-base` is declared as a standalone `@utility` in `app/globals.css` instead of a normal `@theme` color token. Registering "base" as a `--color-*` theme key silently turns Tailwind's `text-base` (font-size: 1rem) into a text-color utility, which broke font-sizing on shadcn's own Card/Dialog titles. The `@utility` form avoids the collision but does not support the `/alpha` modifier (e.g. `bg-base/95` from `20-ai-sidebar-shell.md`) — revisit if that's needed later. Every other custom token (`surface`, `elevated`, `subtle`, `brand`, `ai`, etc.) is a normal theme color since none of those names collide with a reserved Tailwind scale key.
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL` were added to `.env.local` (as `/sign-in` / `/sign-up`) as part of 03-auth even though `03-auth.md` calls them "existing" env vars — they weren't present before this change. Treated as Clerk's own standard var names (not app-invented custom vars), so adding them doesn't conflict with "use existing Clerk env vars, don't invent new ones."
- 03-auth uses Clerk's `dark` theme (`@clerk/ui/themes`) per the explicit spec instruction, not the `shadcn` theme the `clerk-custom-ui` skill otherwise recommends by default when `components.json` is present. The `dark` theme's `variables` are still fully remapped onto this app's CSS tokens in `lib/clerk-appearance.ts`, so Clerk's visual language (spacing/type scale) comes from `dark` but all colors come from the app palette.
- `/editor` does not exist as a route yet — `proxy.ts` and `app/page.tsx` already redirect authenticated users there per `03-auth.md`, but the page itself is built in `04-project-dialogs`. Until that lands, a signed-in user hitting `/` gets a 404.

## Session Notes

- Add context needed to resume work in the next session.
