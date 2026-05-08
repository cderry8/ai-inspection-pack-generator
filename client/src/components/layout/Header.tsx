"use client";

export default function Header() {
  return (
    <header className="mb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          AI Inspection Pack
        </span>
        <br />
        <span className="text-white">Generator</span>
      </h1>
      <p className="text-slate-400 max-w-2xl mx-auto">
        Transform raw inspection notes into professional reports with AI-powered risk analysis
      </p>
    </header>
  );
}
