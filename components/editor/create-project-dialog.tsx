"use client"

import { Plus } from "lucide-react"

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

interface CreateProjectDialogProps {
  open: boolean
  name: string
  roomId: string
  isSubmitting: boolean
  onOpenChange: (open: boolean) => void
  onNameChange: (name: string) => void
  onSubmit: () => void
}

export function CreateProjectDialog({
  open,
  name,
  roomId,
  isSubmitting,
  onOpenChange,
  onNameChange,
  onSubmit,
}: CreateProjectDialogProps) {
  return (
    <DialogPattern open={open} onOpenChange={onOpenChange}>
      <DialogPatternContent>
        <DialogPatternHeader>
          <DialogPatternTitle>Create project</DialogPatternTitle>
          <DialogPatternDescription>
            Start a new architecture workspace.
          </DialogPatternDescription>
        </DialogPatternHeader>

        <form
          className="flex flex-col gap-1.5"
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
          <p className="text-xs text-copy-muted">
            {roomId
              ? `Room ID: ${roomId}`
              : "Enter a name to preview the room ID"}
          </p>

          <DialogPatternFooter>
            <DialogPatternClose render={<Button variant="ghost" />}>
              Cancel
            </DialogPatternClose>
            <Button type="submit" disabled={!name.trim() || isSubmitting}>
              <Plus className="h-4 w-4" />
              Create project
            </Button>
          </DialogPatternFooter>
        </form>
      </DialogPatternContent>
    </DialogPattern>
  )
}
