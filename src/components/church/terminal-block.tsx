"use client";

interface TerminalBlockProps {
  title?: string;
  children: React.ReactNode;
}

export function TerminalBlock({ title = "terminal", children }: TerminalBlockProps) {
  return (
    <div className="rounded-lg border border-white/10 overflow-hidden bg-[#0d0d0d] font-mono text-sm">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs text-white/40">{title}</span>
      </div>
      <div className="p-4 text-gray-300 leading-relaxed whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}
