export function LogoIcon({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield background */}
      <path
        d="M32 4L48 12V32C48 44 32 56 32 56C32 56 16 44 16 32V12L32 4Z"
        fill="url(#shieldGradient)"
        strokeWidth="1.5"
        stroke="currentColor"
      />
      
      {/* Sentinel eye */}
      <circle cx="32" cy="28" r="8" fill="#00d4ff" opacity="0.8" />
      <circle cx="32" cy="28" r="5" fill="#0f172a" />
      <circle cx="34" cy="26" r="2.5" fill="#00d4ff" />
      
      {/* Security rings */}
      <circle cx="32" cy="28" r="14" stroke="url(#ringGradient)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="32" cy="28" r="10" stroke="url(#ringGradient2)" strokeWidth="1" opacity="0.4" />
      
      {/* Check mark for integrity */}
      <path
        d="M26 35L30 40L40 25"
        stroke="#00ffaa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00ffaa" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#7c5cff" />
        </linearGradient>
        <linearGradient id="ringGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ffaa" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function LogoText({ className = "text-lg" }: { className?: string }) {
  return (
    <div className={`font-bold tracking-tight ${className}`}>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400">
        IntegriSentinel
      </span>
    </div>
  )
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <LogoIcon className="size-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-lg blur-lg" />
      </div>
      <LogoText className="text-xl" />
    </div>
  )
}
