import type { LucideIcon } from "lucide-react"
import { FileText, Share2, Sparkles } from "lucide-react"

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Share2,
    title: "Real-time Collaboration",
    description: "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description: "Export a complete Markdown technical spec directly from the canvas graph.",
  },
]

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-base">
      <div className="relative hidden w-1/2 shrink-0 flex-col overflow-hidden border-r border-surface-border px-16 py-12 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-128 w-lg rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent-primary) 24%, transparent), transparent 70%)",
          }}
        />

        <div className="relative flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand" />
          <span className="text-sm font-bold text-copy-primary">Ghost AI</span>
        </div>

        <div className="relative flex flex-1 flex-col justify-center">
          <h1 className="max-w-md text-4xl font-bold leading-tight text-copy-primary">
            Design systems at the speed of thought.
          </h1>
          <p className="mt-4 max-w-sm text-base text-copy-muted">
            Describe your architecture in plain English. Ghost AI maps it to
            a shared canvas your whole team can refine in real time.
          </p>

          <ul className="mt-10 space-y-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-elevated text-brand">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-copy-primary">
                    {title}
                  </p>
                  <p className="text-sm text-copy-muted">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-copy-faint">
          © {new Date().getFullYear()} Ghost AI. All rights reserved.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  )
}
