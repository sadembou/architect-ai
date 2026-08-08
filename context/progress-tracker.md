# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature: Editor Chrome

## Current Goal

- Define the immediate implementation goal here.

## Completed

- 01-design-system: Installed shadcn/ui (base-nova/base-ui preset) with Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea; installed lucide-react; added `lib/utils.ts` `cn()` helper; wired the dark palette from `context/ui-context.md` into `app/globals.css` (shadcn semantic tokens + `bg-base`/`bg-surface`/`bg-elevated`/`bg-subtle`/`border-surface-border`/`text-copy-*`/`text-brand`/`border-brand`/`bg-brand-dim`/`text-accent-text`/error/success/warning utilities); `html` now carries a permanent `dark` class (app is dark-only, no light variant).
- 02-editor-chrome: added `components/editor/editor-navbar.tsx` (fixed-height top bar, left/center/right sections, sidebar toggle button swapping `PanelLeftOpen`/`PanelLeftClose`, `bg-surface` with bottom border), `components/editor/project-sidebar.tsx` (absolutely-positioned floating overlay so it doesn't push canvas content, slides in/out via `translate-x` on `isOpen`, `My Projects`/`Shared` shadcn Tabs with empty placeholder states, full-width `New Project` button with `Plus` icon), and `components/editor/dialog-pattern.tsx` (thin wrapper around `components/ui/dialog.tsx` applying the `rounded-3xl`/`bg-elevated`/token styling from `ui-context.md`, exposing title/description/footer slots — no concrete dialog instances built yet, per spec). `tsc --noEmit` and `eslint` both clean.

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- `bg-base` is declared as a standalone `@utility` in `app/globals.css` instead of a normal `@theme` color token. Registering "base" as a `--color-*` theme key silently turns Tailwind's `text-base` (font-size: 1rem) into a text-color utility, which broke font-sizing on shadcn's own Card/Dialog titles. The `@utility` form avoids the collision but does not support the `/alpha` modifier (e.g. `bg-base/95` from `20-ai-sidebar-shell.md`) — revisit if that's needed later. Every other custom token (`surface`, `elevated`, `subtle`, `brand`, `ai`, etc.) is a normal theme color since none of those names collide with a reserved Tailwind scale key.

## Session Notes

- Add context needed to resume work in the next session.
