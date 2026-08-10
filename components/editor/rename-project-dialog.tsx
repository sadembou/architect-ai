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
import { Input } from "@/components/ui/input"

interface RenameProjectDialogProps {
  open: boolean
  currentName: string
  name: string
  isSubmitting: boolean
  onOpenChange: (open: boolean) => void
  onNameChange: (name: string) => void
  onSubmit: () => void
}

export function RenameProjectDialog({
  open,
  currentName,
  name,
  isSubmitting,
  onOpenChange,
  onNameChange,
  onSubmit,
}: RenameProjectDialogProps) {
  return (
    <DialogPattern open={open} onOpenChange={onOpenChange}>
      <DialogPatternContent>
        <DialogPatternHeader>
          <DialogPatternTitle>Rename project</DialogPatternTitle>
          <DialogPatternDescription>
            Rename &ldquo;{currentName}&rdquo;.
          </DialogPatternDescription>
        </DialogPatternHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <Input
            autoFocus
            value={name}
            placeholder="Project name"
            onChange={(event) => onNameChange(event.target.value)}
          />
        </form>

        <DialogPatternFooter>
          <DialogPatternClose render={<Button variant="ghost" />}>
            Cancel
          </DialogPatternClose>
          <Button disabled={!name.trim() || isSubmitting} onClick={onSubmit}>
            Save
          </Button>
        </DialogPatternFooter>
      </DialogPatternContent>
    </DialogPattern>
  )
}
