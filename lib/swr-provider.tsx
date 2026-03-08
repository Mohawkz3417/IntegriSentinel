"use client"

import { SWRConfig } from "swr"
import type { ReactNode } from "react"

export function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        // Don't revalidate on focus in demo mode (reduces API calls)
        revalidateOnFocus: false,
        // Don't retry on error in demo mode
        shouldRetryOnError: false,
        // Keep data fresh for 5 minutes
        dedupingInterval: 300000,
        // Error handler with helpful message
        onError: (error, key) => {
          console.warn(`[SWR] Error fetching ${key}:`, error.message)
          console.info("[SWR] Using mock data. Set NEXT_PUBLIC_FLASK_API_URL to connect to Flask backend.")
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
