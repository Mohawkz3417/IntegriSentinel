"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockMaliciousHashes } from "@/lib/mock-data"
import { Search, Copy, CheckCircle2, AlertTriangle } from "lucide-react"
import { useState } from "react"

export function HashIntelligence() {
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedHash, setCopiedHash] = useState("")

  const filteredHashes = mockMaliciousHashes.filter((h) =>
    h.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.source.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const copyToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(""), 2000)
  }

  return (
    <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 overflow-hidden">
      <CardHeader className="border-b border-cyan-500/10 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="size-5 text-amber-500" />
              Hash Intelligence Database
            </CardTitle>
            <CardDescription>Malicious file hashes and threat intelligence</CardDescription>
          </div>
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs">
            {mockMaliciousHashes.length} Hashes
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by hash, type, or source..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-cyan-500/20 bg-slate-900/50 focus:border-cyan-500/50 focus:ring-cyan-500/20"
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredHashes.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <p>No hashes found matching your search</p>
              </div>
            ) : (
              filteredHashes.map((hash, index) => (
                <div
                  key={hash.hash}
                  className="flex items-center gap-3 rounded-lg border border-cyan-500/10 bg-slate-900/30 hover:bg-slate-900/60 hover:border-cyan-500/20 p-3 transition-all group animate-slide-up"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-[10px]">
                        {hash.type}
                      </Badge>
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-[10px]">
                        {hash.source}
                      </Badge>
                    </div>
                    <p className="text-xs font-mono text-cyan-300 break-all group-hover:text-cyan-200 transition-colors">
                      {hash.hash}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Added: {new Date(hash.addedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(hash.hash)}
                    className="shrink-0 hover:bg-cyan-500/10"
                  >
                    {copiedHash === hash.hash ? (
                      <CheckCircle2 className="size-4 text-emerald-500" />
                    ) : (
                      <Copy className="size-4 text-muted-foreground group-hover:text-cyan-300 transition-colors" />
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
