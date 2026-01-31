"use client";

export function SacredGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(212,165,116,0.06)_0%,_transparent_70%)]" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(212,165,116,0.03)_0%,_transparent_70%)]" />
    </div>
  );
}
