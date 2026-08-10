"use client"

import {
  DialogPattern,
  DialogPatternClose,
  DialogPatternContent,
  DialogPatternDescription,
  DialogPatternFooter,
  DialogPatternHeader,
  DialogPatternTitle,
} from "@/components/editor/dialog-pattern"
import { Button } from "@/components/ui/button"

interface DeleteProjectDialogProps {
  open: boolean
  projectName: string
  isSubmitting: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteProjectDialog({
  open,
  projectName,
  isSubmitting,
  onOpenChange,
  onConfirm,
}: DeleteProjectDialogProps) {
  return (
    <DialogPattern open={open} onOpenChange={onOpenChange}>
      <DialogPatternContent>
        <DialogPatternHeader>
          <DialogPatternTitle>Delete project</DialogPatternTitle>
          <DialogPatternDescription>
            This will permanently delete &ldquo;{projectName}&rdquo;. This
            action cannot be undone.
          </DialogPatternDescription>
        </DialogPatternHeader>

        <DialogPatternFooter>
          <DialogPatternClose render={<Button variant="ghost" />}>
            Cancel
          </DialogPatternClose>
          <Button
            variant="destructive"
            disabled={isSubmitting}
            onClick={onConfirm}
          >
            Delete project
          </Button>
        </DialogPatternFooter>
      </DialogPatternContent>
    </DialogPattern>
  )
}
