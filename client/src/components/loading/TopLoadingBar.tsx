"use client";

interface TopLoadingBarProps {
  isLoading: boolean;
}

export default function TopLoadingBar({ isLoading }: TopLoadingBarProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-800 overflow-hidden">
      <div 
        className="h-full bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-lg shadow-cyan-500/50 animate-progress-fill"
        style={{ width: "0%" }}
      />
    </div>
  );
}
