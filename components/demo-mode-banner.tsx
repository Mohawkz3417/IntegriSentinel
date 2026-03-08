"use client"

import { useState } from "react"
import { X, Info } from "lucide-react"

const FLASK_API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL || ""
const IS_DEMO_MODE = !FLASK_API_URL

export function DemoModeBanner() {
  const [dismissed, setDismissed] = useState(false)

  // Don't show if connected to Flask or dismissed
  if (!IS_DEMO_MODE || dismissed) return null

  return (
    <div className="relative flex items-center justify-center gap-2 bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-xs text-amber-500">
      <Info className="size-3.5 shrink-0" />
      <span>
        <strong>Demo Mode</strong> - Using mock data. Set <code className="font-mono bg-amber-500/20 px-1 py-0.5 rounded">NEXT_PUBLIC_FLASK_API_URL</code> to connect to Flask backend.
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 p-1 hover:bg-amber-500/20 rounded transition-colors"
        aria-label="Dismiss"
      >
        <X className="size-3.5" />
      </button>
    </div>
  )
}
