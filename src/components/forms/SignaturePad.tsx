import { useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"
import { Button } from "@/components/ui/button"

interface SignaturePadProps {
  onChange: (signature: string) => void
}

export function SignaturePad({ onChange }: SignaturePadProps) {
  const signaturePadRef = useRef<SignatureCanvas>(null)
  const [isEmpty, setIsEmpty] = useState(true)

  const handleClear = () => {
    signaturePadRef.current?.clear()
    setIsEmpty(true)
    onChange("")
  }

  const handleEnd = () => {
    const canvas = signaturePadRef.current
    if (canvas) {
      setIsEmpty(canvas.isEmpty())
      if (!canvas.isEmpty()) {
        onChange(canvas.toDataURL())
      }
    }
  }

  return (
    <div className="space-y-2">
      <div className="border rounded-md p-2 bg-white">
        <SignatureCanvas
          ref={signaturePadRef}
          canvasProps={{
            className: "signature-canvas w-full h-32",
          }}
          onEnd={handleEnd}
        />
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleClear}
        disabled={isEmpty}
      >
        Clear Signature
      </Button>
    </div>
  )
}