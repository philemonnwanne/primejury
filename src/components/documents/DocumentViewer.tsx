import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Document {
  id: string
  name: string
  type: string
  url: string
}

interface DocumentViewerProps {
  document: Document | null
  onClose: () => void
}

export function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  if (!document) return null

  return (
    <Dialog open={!!document} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{document.name}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full bg-muted">
          {document.type === "PDF" ? (
            <iframe
              src={document.url}
              className="h-full w-full"
              title={document.name}
            />
          ) : document.type === "Image" ? (
            <img
              src={document.url}
              alt={document.name}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p>Preview not available for this file type</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}