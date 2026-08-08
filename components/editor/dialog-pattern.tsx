import type { ComponentProps } from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

function DialogPatternContent({
  className,
  ...props
}: ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      className={cn(
        "rounded-3xl border border-surface-border bg-elevated text-copy-primary",
        className
      )}
      {...props}
    />
  )
}

function DialogPatternTitle({
  className,
  ...props
}: ComponentProps<typeof DialogTitle>) {
  return (
    <DialogTitle className={cn("text-copy-primary", className)} {...props} />
  )
}

function DialogPatternDescription({
  className,
  ...props
}: ComponentProps<typeof DialogDescription>) {
  return (
    <DialogDescription
      className={cn("text-copy-muted", className)}
      {...props}
    />
  )
}

function DialogPatternFooter({
  className,
  ...props
}: ComponentProps<typeof DialogFooter>) {
  return (
    <DialogFooter
      className={cn(
        "rounded-b-3xl border-surface-border bg-elevated/50",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog as DialogPattern,
  DialogTrigger as DialogPatternTrigger,
  DialogClose as DialogPatternClose,
  DialogHeader as DialogPatternHeader,
  DialogPatternContent,
  DialogPatternTitle,
  DialogPatternDescription,
  DialogPatternFooter,
}
